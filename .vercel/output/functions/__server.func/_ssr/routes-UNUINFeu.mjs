import { i as __toESM } from "../_runtime.mjs";
import { n as gsapWithCSS, r as require_react, t as useGSAP } from "../_libs/gsap+gsap__react+react.mjs";
import { v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as ScrollTrigger } from "../_libs/gsap.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-UNUINFeu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SHOTS = [
	{
		id: "close",
		src: "/hero/close.mp4",
		poster: "/hero/close.jpg",
		position: "72% 48%"
	},
	{
		id: "reach",
		src: "/hero/reach-wide.mp4",
		srcPortrait: "/hero/reach-portrait.mp4",
		poster: "/hero/reach-wide.jpg",
		posterPortrait: "/hero/source.jpg",
		position: "42% 50%",
		positionPortrait: "50% 38%"
	},
	{
		id: "orchard",
		src: "/hero/orchard.mp4",
		poster: "/hero/orchard.jpg",
		position: "50% 72%"
	},
	{
		id: "canopy",
		src: "/hero/canopy.mp4",
		poster: "/hero/canopy.jpg",
		position: "50% 46%"
	},
	{
		id: "home",
		src: "/hero/reach-wide.mp4",
		srcPortrait: "/hero/reach-portrait.mp4",
		poster: "/hero/reach-wide.jpg",
		posterPortrait: "/hero/source.jpg",
		position: "42% 50%",
		positionPortrait: "50% 38%"
	}
];
gsapWithCSS.registerPlugin(useGSAP);
if (typeof window !== "undefined") gsapWithCSS.registerPlugin(ScrollTrigger);
function PearMark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: "hero-mark",
		viewBox: "0 0 18 22",
		"aria-hidden": "true",
		fill: "currentColor",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9.1 1.2c.7 1.4.8 2.5.1 3.4C6.6 5.5 4.4 8.2 4.4 11.6c0 3 2 5.2 4.7 5.2s4.7-2.2 4.7-5.2c0-3.4-2.2-6.1-4.8-7-.7-.9-.6-2 .1-3.4Z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M9.3.6c.12 1.4 0 2.4-.5 3.2",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.1",
			strokeLinecap: "round",
			opacity: "0.7"
		})]
	});
}
function ShotLayer({ shot, priority }) {
	const preload = priority ? "auto" : "metadata";
	const hasPortrait = Boolean(shot.srcPortrait);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: hasPortrait ? "hero-shot hero-has-portrait" : "hero-shot",
		"data-shot": shot.id,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hero-media",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				className: hasPortrait ? "hero-video hero-video-landscape" : "hero-video",
				src: shot.src,
				poster: shot.poster,
				muted: true,
				loop: true,
				playsInline: true,
				autoPlay: true,
				preload,
				style: { objectPosition: shot.position }
			}), hasPortrait ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				className: "hero-video hero-video-portrait",
				src: shot.srcPortrait,
				poster: shot.posterPortrait ?? shot.poster,
				muted: true,
				loop: true,
				playsInline: true,
				autoPlay: true,
				preload,
				style: { objectPosition: shot.positionPortrait ?? shot.position }
			}) : null]
		})
	});
}
function HeroJourney() {
	const rootRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const root = rootRef.current;
		if (!root) return;
		const videos = Array.from(root.querySelectorAll("video"));
		const arm = () => {
			for (const video of videos) {
				video.muted = true;
				video.playsInline = true;
				video.play().catch(() => void 0);
			}
		};
		arm();
		window.addEventListener("pointerdown", arm, { once: true });
		window.addEventListener("scroll", arm, { once: true });
		return () => {
			window.removeEventListener("pointerdown", arm);
			window.removeEventListener("scroll", arm);
		};
	}, []);
	useGSAP(() => {
		const root = rootRef.current;
		if (!root) return;
		const shots = gsapWithCSS.utils.toArray("[data-shot]", root);
		const medias = shots.map((shot) => shot.querySelector(".hero-media"));
		const fill = root.querySelector(".hero-progress-fill");
		const hint = root.querySelector(".hero-hint");
		const dots = gsapWithCSS.utils.toArray("[data-dot]", root);
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			gsapWithCSS.set(shots, { opacity: 0 });
			gsapWithCSS.set(shots[1] ?? shots[0], { opacity: 1 });
			gsapWithCSS.set(medias, { scale: 1 });
			return;
		}
		gsapWithCSS.set(shots, { opacity: 0 });
		gsapWithCSS.set(shots[0], { opacity: 1 });
		gsapWithCSS.set(medias, { scale: 1.08 });
		gsapWithCSS.set(medias[0], { scale: 1.2 });
		const syncVideos = () => {
			for (const shot of shots) {
				const live = Number.parseFloat(window.getComputedStyle(shot).opacity) > .05;
				shot.querySelectorAll("video").forEach((video) => {
					if (live) {
						if (video.paused) video.play().catch(() => void 0);
					} else if (!video.paused) video.pause();
				});
			}
		};
		const setActive = (index) => {
			dots.forEach((dot, i) => {
				dot.classList.toggle("is-active", i === index);
			});
		};
		const tl = gsapWithCSS.timeline({
			defaults: { ease: "none" },
			scrollTrigger: {
				trigger: root,
				start: "top top",
				end: "+=620%",
				pin: true,
				scrub: .9,
				anticipatePin: 1,
				invalidateOnRefresh: true,
				onUpdate(self) {
					const p = self.progress;
					let index = 0;
					if (p >= .24) index = 1;
					if (p >= .5) index = 2;
					if (p >= .68) index = 3;
					if (p >= .84) index = 4;
					setActive(index);
					syncVideos();
				}
			}
		});
		if (fill) tl.fromTo(fill, { scaleX: 0 }, {
			scaleX: 1,
			duration: 10,
			ease: "none"
		}, 0);
		if (hint) tl.to(hint, {
			opacity: 0,
			duration: .55
		}, .12);
		tl.to(medias[0], {
			scale: 1.05,
			duration: 2.15
		}, 0);
		tl.to(shots[0], {
			opacity: 0,
			duration: .62
		}, 2.05);
		tl.fromTo(shots[1], { opacity: 0 }, {
			opacity: 1,
			duration: .62
		}, 2.05);
		tl.fromTo(medias[1], {
			scale: 1.62,
			yPercent: 8
		}, {
			scale: 1.32,
			yPercent: 4,
			duration: .62
		}, 2.05);
		tl.to(medias[1], {
			scale: 1,
			yPercent: 0,
			duration: 2.05
		}, 2.67);
		tl.to(shots[1], {
			opacity: 0,
			duration: .62
		}, 4.55);
		tl.fromTo(shots[2], { opacity: 0 }, {
			opacity: 1,
			duration: .62
		}, 4.55);
		tl.fromTo(medias[2], { scale: 1.16 }, {
			scale: 1.05,
			duration: .62
		}, 4.55);
		tl.to(medias[2], {
			scale: 1,
			duration: 1.15
		}, 5.17);
		tl.to(shots[2], {
			opacity: 0,
			duration: .68
		}, 6.2);
		tl.fromTo(shots[3], { opacity: 0 }, {
			opacity: 1,
			duration: .68
		}, 6.2);
		tl.fromTo(medias[3], { scale: 1.2 }, {
			scale: 1.08,
			duration: .68
		}, 6.2);
		tl.to(medias[3], {
			scale: 1,
			duration: 1.05
		}, 6.88);
		tl.to(shots[3], {
			opacity: 0,
			duration: .7
		}, 7.85);
		tl.fromTo(shots[4], { opacity: 0 }, {
			opacity: 1,
			duration: .7
		}, 7.85);
		tl.fromTo(medias[4], { scale: 1.1 }, {
			scale: 1,
			duration: 1.35
		}, 7.85);
		tl.to(medias[4], {
			scale: 1,
			duration: .8
		}, 9.2);
		setActive(0);
		syncVideos();
		const onRefresh = () => ScrollTrigger.refresh();
		window.addEventListener("load", onRefresh);
		return () => window.removeEventListener("load", onRefresh);
	}, { scope: rootRef });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		ref: rootRef,
		className: "relative bg-espresso text-ivory",
		"aria-label": "Cinematic orchard sequence",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "sr-only",
			children: "Nurture"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hero-stage",
			children: [
				SHOTS.map((shot, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShotLayer, {
					shot,
					priority: index < 2
				}, shot.id)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-vignette" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-grain" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hero-progress",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hero-progress-fill" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hero-dots",
					"aria-hidden": "true",
					children: SHOTS.map((shot, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-dot": shot.id,
						className: index === 0 ? "hero-dot is-active" : "hero-dot"
					}, shot.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hero-hint",
					"aria-hidden": "true",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hero-chevron" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hero-chevron" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PearMark, {})
			]
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroJourney, {});
}
//#endregion
export { Home as component };
