import { useInView } from 'motion/react'
import { useRef } from 'react'

/*
 * Flat illustration: a barista doing a pour-over at a window that looks out on a sea of
 * clouds at dawn. Animated with CSS keyframes (`.barista-*` in index.css) on one 8s
 * timeline: the kettle tilts in, the stream runs, the server fills, the kettle lifts.
 * CSS rather than Motion so it plays straight from the prerendered HTML at no JS cost.
 * Pivot points are SVG user units (viewBox 0 0 400 500), set inline next to each shape.
 */

const stop = (color: string, opacity = 1) => ({ stopColor: `var(--color-${color})`, stopOpacity: opacity })

export function BaristaScene() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '100px' })

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-paused={inView ? undefined : ''}
      className="barista relative aspect-4/5 w-full overflow-hidden rounded-t-full border border-crema/25 bg-linear-to-b from-roast via-clay-ink via-30% to-crema to-50%"
    >
      {/* Sun halo and lamp glow as CSS gradients: SVG gradients this size slow the first paint. */}
      <div className="absolute inset-0 bg-radial-[circle_at_29.5%_52.4%] from-foam/50 via-crema/35 via-9% to-transparent to-24%" />
      <div className="absolute inset-0 bg-radial-[circle_at_17.5%_19.2%] from-crema/30 to-transparent to-12%" />
      <svg viewBox="0 0 400 500" className="absolute inset-0 size-full">
        <defs>
          <linearGradient id="barista-coffee" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={stop('crema')} />
            <stop offset="1" style={stop('clay-ink')} />
          </linearGradient>
          <linearGradient id="barista-kettle-shine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" style={stop('bean', 0.9)} />
            <stop offset="0.45" style={stop('espresso')} />
          </linearGradient>
          <clipPath id="barista-server">
            <path d="M136 381 Q128 352 143 340 L167 340 Q182 352 174 381 Z" />
          </clipPath>
          <clipPath id="barista-stream">
            <rect x="151" y="266" width="8" height="40" />
          </clipPath>
        </defs>

        {/* The view (sky and halo are on the container): sun, ridges, a sea of clouds between them */}
        <circle cx="118" cy="262" r="26" className="fill-foam" opacity={0.9} />
        <path
          d="M0 282 L34 266 L70 276 L118 250 L160 272 L206 256 L250 276 L300 258 L346 272 L400 260 V400 H0 Z"
          className="fill-clay-ink"
          opacity={0.8}
        />
        <g className="barista-clouds" style={{ transformOrigin: '200px 300px' }}>
          <ellipse cx="60" cy="296" rx="80" ry="10" className="fill-oat" opacity={0.5} />
          <ellipse cx="250" cy="292" rx="110" ry="9" className="fill-oat" opacity={0.45} />
        </g>
        <path
          d="M0 312 L48 290 L96 304 L150 284 L196 302 L244 288 L300 306 L354 290 L400 300 V400 H0 Z"
          className="fill-bean"
        />
        <g className="barista-clouds barista-clouds-alt" style={{ transformOrigin: '200px 330px' }}>
          <ellipse cx="120" cy="326" rx="120" ry="11" className="fill-oat" opacity={0.4} />
          <ellipse cx="340" cy="330" rx="90" ry="8" className="fill-oat" opacity={0.35} />
        </g>
        <path d="M0 344 L60 322 L124 338 L190 318 L260 340 L330 324 L400 336 V400 H0 Z" className="fill-roast" />

        {/* Pendant lamp, swaying slightly */}
        <g className="barista-lamp" style={{ transformOrigin: '70px 0px' }}>
          <path d="M70 0 V72" className="stroke-espresso" strokeWidth={2} />
          <path d="M48 94 Q50 72 70 72 Q90 72 92 94 Z" className="fill-espresso" />
          <path d="M48 94 H92" className="stroke-crema" strokeWidth={2} strokeLinecap="round" />
          <ellipse cx="70" cy="96" rx="9" ry="4" className="fill-foam" />
        </g>

        {/* Barista: body, apron, resting arm */}
        <path
          d="M230 400 C228 300 236 240 262 224 Q291 214 320 224 C346 240 354 300 352 400 Z"
          className="fill-oat"
        />
        <path d="M322 226 C346 242 354 300 352 400 H316 C320 320 322 260 322 226 Z" className="fill-bean" opacity={0.18} />
        <path d="M276 222 L291 238 L306 222" fill="none" className="stroke-bean" strokeOpacity={0.4} strokeWidth={2} />
        <path d="M262 236 L282 224 M322 236 L302 224" className="stroke-clay" strokeWidth={5} strokeLinecap="round" />
        <path d="M256 264 Q292 256 330 264 L338 400 H246 Z" className="fill-clay" />
        <path d="M316 262 Q324 262 330 264 L338 400 H320 Z" className="fill-clay-ink" />
        <path d="M262 236 L258 266 M322 236 L326 266" className="stroke-clay" strokeWidth={5} strokeLinecap="round" />
        <rect x="270" y="320" width="44" height="30" rx="4" fill="none" className="stroke-clay-ink" strokeWidth={2} />
        {/* Tanaw mark on the apron bib */}
        <path
          d="M281 292 l9 -9 l6 6 l6 -6 l9 9"
          fill="none"
          className="stroke-crema"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="300" cy="276" r="2.5" className="fill-crema" />
        <path d="M338 238 Q356 262 356 304" fill="none" className="stroke-oat" strokeWidth={26} strokeLinecap="round" />
        <path d="M356 300 Q352 344 334 376" fill="none" className="stroke-skin" strokeWidth={17} strokeLinecap="round" />
        <path d="M344 296 H368" className="stroke-foam" strokeWidth={7} strokeLinecap="round" />

        {/* Neck and head, dipping to watch the pour */}
        <path d="M280 194 H302 V226 Q291 232 280 226 Z" className="fill-skin" />
        <path d="M280 196 Q291 210 302 198 V208 Q291 218 280 208 Z" className="fill-skin-shade" />
        <g className="barista-head" style={{ transformOrigin: '291px 206px' }}>
          <g transform="translate(0 14)">
            <circle cx="314" cy="114" r="14" className="fill-espresso" />
            <rect x="302" y="122" width="10" height="6" rx="2" transform="rotate(-35 307 125)" className="fill-crema" />
            <ellipse cx="290" cy="154" rx="29" ry="33" className="fill-skin" />
            <ellipse cx="314" cy="158" rx="6" ry="9" className="fill-skin-shade" />
            <path
              d="M261 152 C256 122 276 112 296 116 C318 120 326 138 320 164 C318 152 312 144 304 140 C292 134 270 136 261 152 Z"
              className="fill-espresso"
            />
            <path d="M264 158 q5 4 10 0 M282 158 q5 4 10 0" fill="none" className="stroke-espresso" strokeWidth={2.2} strokeLinecap="round" />
            <path d="M264 148 h9 M283 148 h9" className="stroke-espresso" strokeWidth={2} strokeLinecap="round" opacity={0.7} />
            <path d="M263 162 q-5 7 2 9" fill="none" className="stroke-skin-shade" strokeWidth={2} strokeLinecap="round" />
            <path d="M269 176 q6 4 12 0" fill="none" className="stroke-clay-ink" strokeWidth={2.2} strokeLinecap="round" />
            <ellipse cx="270" cy="168" rx="6" ry="3.5" className="fill-clay" opacity={0.3} />
            <ellipse cx="296" cy="168" rx="6" ry="3.5" className="fill-clay" opacity={0.3} />
          </g>
        </g>

        {/* Pouring arm: rolled sleeve, forearm up to the kettle handle */}
        <path d="M252 240 Q236 270 240 302" fill="none" className="stroke-oat" strokeWidth={26} strokeLinecap="round" />
        <path d="M240 302 Q252 276 262 250" fill="none" className="stroke-skin" strokeWidth={17} strokeLinecap="round" />
        <path d="M228 300 H252" className="stroke-foam" strokeWidth={7} strokeLinecap="round" />

        {/* Matte-black gooseneck kettle (drawn upright, tilted into the pour) */}
        <g className="barista-kettle" style={{ transformOrigin: '264px 246px' }}>
          <g transform="rotate(-24 226 262)">
            <path
              d="M202 286 L252 286 L248 250 Q246 238 234 236 L218 236 Q206 238 204 250 Z"
              fill="url(#barista-kettle-shine)"
            />
            <ellipse cx="226" cy="236" rx="13" ry="4" className="fill-bean" />
            <circle cx="226" cy="229" r="4" className="fill-espresso" />
            <path d="M249 248 C272 244 274 282 251 283" fill="none" className="stroke-espresso" strokeWidth={6} strokeLinecap="round" />
            <path
              d="M204 279 C186 279 182 262 180 250 C178 240 170 234 158 236"
              fill="none"
              className="stroke-espresso"
              strokeWidth={4.5}
              strokeLinecap="round"
            />
            <path d="M209 252 V280" className="stroke-oat" strokeOpacity={0.35} strokeWidth={2} strokeLinecap="round" />
          </g>
        </g>
        <circle cx="264" cy="248" r="10" className="fill-skin" />

        {/* Water stream: faint line with dashes flowing down it */}
        <g className="barista-stream">
          <path d="M155 268 V304" className="stroke-foam" strokeWidth={2.5} strokeLinecap="round" opacity={0.4} />
          <g clipPath="url(#barista-stream)">
            <path
              className="barista-flow stroke-foam"
              d="M155 240 v6 M155 254 v6 M155 268 v6 M155 282 v6 M155 296 v6 M155 310 v6"
              strokeWidth={2.5}
              strokeLinecap="round"
            />
          </g>
        </g>

        {/* Counter */}
        <rect x="0" y="388" width="400" height="14" className="fill-bean" />
        <path d="M0 388.5 H400" className="stroke-crema" strokeOpacity={0.45} strokeWidth={1.5} />
        <rect x="0" y="402" width="400" height="98" className="fill-espresso" />
        <path
          d="M50 410 V500 M100 410 V500 M150 410 V500 M200 410 V500 M250 410 V500 M300 410 V500 M350 410 V500"
          className="stroke-oat"
          strokeOpacity={0.06}
        />

        {/* Scale, glass server filling, ceramic dripper */}
        <ellipse cx="155" cy="390" rx="52" ry="4" className="fill-espresso" opacity={0.5} />
        <rect x="108" y="380" width="94" height="9" rx="3" className="fill-espresso" />
        <rect x="182" y="383" width="14" height="3" rx="1" className="fill-crema" />
        <g clipPath="url(#barista-server)">
          <rect
            x="126"
            y="340"
            width="58"
            height="42"
            fill="url(#barista-coffee)"
            className="barista-level"
            style={{ transformOrigin: '155px 381px', transform: 'scaleY(0.6)' }}
          />
        </g>
        <path
          d="M136 381 Q128 352 143 340 L167 340 Q182 352 174 381 Z"
          className="fill-foam stroke-oat"
          fillOpacity={0.12}
          strokeWidth={1.5}
        />
        <path d="M140 372 Q137 358 144 349" fill="none" className="stroke-foam" strokeOpacity={0.6} strokeWidth={2} strokeLinecap="round" />
        <rect x="142" y="333" width="26" height="8" rx="2" className="fill-oat" />
        <path d="M130 304 L180 304 L164 334 L146 334 Z" className="fill-foam" />
        <path d="M150 334 L138 308 M160 334 L172 308 M155 334 V308" className="stroke-bean" strokeOpacity={0.18} strokeWidth={1.5} />
        <path d="M130 304 L180 304 L176 312 L134 312 Z" className="fill-oat" />
        <ellipse cx="155" cy="305" rx="21" ry="3" className="fill-bean" />
        <g className="barista-drips">
          <circle cx="155" cy="344" r="2.2" className="barista-drip fill-crema" />
          <circle cx="155" cy="344" r="2.2" className="barista-drip fill-crema" style={{ animationDelay: '-0.5s' }} />
        </g>

        {/* A served cup, still steaming */}
        <ellipse cx="62" cy="389" rx="30" ry="4" className="fill-espresso" opacity={0.5} />
        <ellipse cx="62" cy="385" rx="30" ry="4" className="fill-oat" />
        <path d="M40 356 H84 L80 376 Q78 384 70 384 H54 Q46 384 44 376 Z" className="fill-foam" />
        <path d="M84 362 q13 1 11 11 q-2 6 -14 4" fill="none" className="stroke-foam" strokeWidth={4} />
        <ellipse cx="62" cy="356" rx="22" ry="3.5" className="fill-bean" />
        <g fill="none" className="stroke-foam" strokeWidth={2} strokeLinecap="round">
          <path className="barista-steam" d="M52 346 q-6 -8 0 -16 q6 -8 0 -16" opacity={0.6} />
          <path className="barista-steam" d="M62 342 q-6 -8 0 -16 q6 -8 0 -16" opacity={0.6} style={{ animationDelay: '-1.1s' }} />
          <path className="barista-steam" d="M72 346 q-6 -8 0 -16 q6 -8 0 -16" opacity={0.6} style={{ animationDelay: '-2.2s' }} />
        </g>
      </svg>
    </div>
  )
}
