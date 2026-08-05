/**
 * Section substrate: AmbientGradient — slow-drifting shader-gradient layer.
 *
 * A "Stripe-style" ambient color field rendered by a tiny WebGL fragment
 * shader from the site's own brand tokens (--primary, --accent,
 * --background — resolved at mount, so it follows the theme). Compose
 * it as a background layer inside any `relative isolate` section:
 *
 *   <section className="relative isolate">
 *     <AmbientGradient />
 *     <Hero className="bg-transparent" ... />
 *   </section>
 *
 * The layer sits at -z-10; siblings that paint their own bg-background
 * (every stock section does) need `bg-transparent` to let it show.
 *
 * Ambient by design: the drift period is tens of seconds — atmosphere, not
 * attention. The loop pauses while offscreen and while the tab is hidden.
 * Reduced motion, or no WebGL, renders an equivalent STATIC CSS gradient
 * from the same tokens — an intentional look, never a blank hole.
 */
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export interface AmbientGradientProps {
  /** Blend strength of the color field over the background, 0–1. */
  intensity?: number
  /** Drift-speed multiplier; 1 ≈ a full wander over ~60s. Keep it slow. */
  speed?: number
  className?: string
}

const FRAG = `
precision mediump float;
uniform vec2 u_res; uniform float u_t, u_mix;
uniform vec3 u_bg, u_a, u_b;
float blob(vec2 p, vec2 c, float r) { return smoothstep(r, 0.0, length(p - c)); }
void main() {
  vec2 asp = vec2(u_res.x / u_res.y, 1.0);
  vec2 p = (gl_FragCoord.xy / u_res) * asp;
  float t = u_t;
  vec2 c1 = vec2(0.30 + 0.22 * sin(t * 0.60),       0.68 + 0.18 * cos(t * 0.40)) * asp;
  vec2 c2 = vec2(0.74 + 0.18 * cos(t * 0.50 + 2.0), 0.34 + 0.20 * sin(t * 0.70 + 1.0)) * asp;
  vec2 c3 = vec2(0.55 + 0.25 * sin(t * 0.30 + 4.0), 0.85 + 0.15 * cos(t * 0.55 + 3.0)) * asp;
  vec2 c4 = vec2(0.18 + 0.16 * cos(t * 0.45 + 5.0), 0.22 + 0.20 * sin(t * 0.35 + 2.5)) * asp;
  vec3 col = u_bg;
  col = mix(col, u_a, u_mix * blob(p, c1, 0.80));
  col = mix(col, u_b, u_mix * blob(p, c2, 0.75));
  col = mix(col, u_a, u_mix * 0.8 * blob(p, c3, 0.65));
  col = mix(col, u_b, u_mix * 0.7 * blob(p, c4, 0.60));
  // Dither so slow ramps never band.
  col += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) / 255.0;
  gl_FragColor = vec4(col, 1.0);
}`

/** First non-empty token, wrapped as a full CSS color — the scaffold's
 * tokens are bare HSL channel triplets (`--primary: 24 95% 53%`). */
function readToken(names: string[]): string {
  const style = getComputedStyle(document.documentElement)
  for (const name of names) {
    const value = style.getPropertyValue(name).trim()
    if (value) return `hsl(${value})`
  }
  return ''
}

/** Resolve any CSS color to 0–1 RGB via canvas. */
function toRgb(css: string, fallback: [number, number, number]) {
  try {
    const ctx = document.createElement('canvas').getContext('2d')
    if (!ctx || !css) return fallback
    ctx.fillStyle = css
    ctx.fillRect(0, 0, 1, 1)
    const d = ctx.getImageData(0, 0, 1, 1).data
    return [d[0] / 255, d[1] / 255, d[2] / 255] as [number, number, number]
  } catch {
    return fallback
  }
}

/** Live prefers-reduced-motion flag. */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return reduced
}

export function AmbientGradient({ intensity = 0.35, speed = 1, className }: AmbientGradientProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas || reducedMotion) return
    const gl = canvas.getContext('webgl', { antialias: false, depth: false, stencil: false })
    if (!gl) return // the static CSS gradient below stays

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, src)
      gl.compileShader(shader)
      return shader
    }
    const program = gl.createProgram()!
    gl.attachShader(program, compile(gl.VERTEX_SHADER, 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'))
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(program, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const u = (name: string) => gl.getUniformLocation(program, name)
    gl.uniform3fv(u('u_bg'), toRgb(readToken(['--background']), [1, 1, 1]))
    gl.uniform3fv(u('u_a'), toRgb(readToken(['--primary']), [0.2, 0.2, 0.2]))
    gl.uniform3fv(u('u_b'), toRgb(readToken(['--accent']), [0.9, 0.9, 0.9]))
    gl.uniform1f(u('u_mix'), Math.min(Math.max(intensity, 0), 1))
    const uRes = u('u_res')
    const uTime = u('u_t')

    // Pausable clock — advances only while frames run, so resume never jumps.
    let elapsed = 0
    let last = 0
    let frame = 0
    let onscreen = true
    const running = () => onscreen && !document.hidden
    const draw = (now: number) => {
      elapsed += last ? now - last : 0
      last = now
      gl.uniform1f(uTime, (elapsed / 1000) * 0.15 * speed)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      frame = running() ? requestAnimationFrame(draw) : 0
    }
    const sync = () => {
      if (running() && !frame) {
        last = 0
        frame = requestAnimationFrame(draw)
      } else if (!running() && frame) {
        cancelAnimationFrame(frame)
        frame = 0
      }
    }
    // Soft gradient: render at capped resolution — the upscale is invisible.
    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.5
      canvas.width = Math.max(1, Math.round(host.clientWidth * scale))
      canvas.height = Math.max(1, Math.round(host.clientHeight * scale))
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      if (!frame) draw(last || performance.now()) // repaint while paused
    }
    const ro = new ResizeObserver(resize)
    ro.observe(host)
    const io = new IntersectionObserver(([entry]) => {
      onscreen = entry.isIntersecting
      sync()
    })
    io.observe(host)
    document.addEventListener('visibilitychange', sync)
    resize()
    sync()

    return () => {
      if (frame) cancelAnimationFrame(frame)
      document.removeEventListener('visibilitychange', sync)
      ro.disconnect()
      io.disconnect()
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [intensity, speed, reducedMotion])

  const tint = Math.round(Math.min(Math.max(intensity, 0), 1) * 72) / 100
  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}
      // Static token gradient — first paint, reduced-motion, and no-WebGL story.
      style={{
        background: [
          `radial-gradient(110% 90% at 22% 20%, hsl(var(--primary) / ${tint}), transparent 62%)`,
          `radial-gradient(100% 90% at 80% 30%, hsl(var(--accent) / ${tint}), transparent 65%)`,
          `radial-gradient(90% 80% at 55% 88%, hsl(var(--primary) / ${Math.round(tint * 60) / 100}), transparent 60%)`,
          'hsl(var(--background))',
        ].join(', '),
      }}
    >
      {!reducedMotion && <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />}
    </div>
  )
}
