import {
  ArrowUp,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Compass,
  Flag,
  Home,
  Image as ImageIcon,
  Landmark,
  Leaf,
  Megaphone,
  Quote,
  Sparkles,
  Sprout,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

type SectionId = 'hero' | 'appreciation' | 'reel' | 'pillars' | 'gallery' | 'inspiration' | 'tribute';

type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  label: string;
  className?: string;
};

const sectionIds: SectionId[] = ['hero', 'appreciation', 'reel', 'pillars', 'gallery', 'inspiration', 'tribute'];

const reelShots = [
  { src: 'assets/shots/shot-01.mp4', poster: 'assets/gallery/photo-02.jpg', caption: 'Where curiosity begins.' },
  { src: 'assets/shots/shot-02.mp4', poster: 'assets/gallery/photo-03.jpg', caption: 'Where character is built.' },
  { src: 'assets/shots/shot-03.mp4', poster: 'assets/gallery/photo-04.jpg', caption: 'Where confidence takes root.' },
  { src: 'assets/shots/shot-04.mp4', poster: 'assets/gallery/photo-05.jpg', caption: 'Where every student is seen.' },
];

const quoteItems = [
  {
    author: 'John Dewey',
    sub: 'On the Meaning of Learning',
    body: '"Education is not preparation for life; education is life itself."',
  },
  {
    author: 'Maria Montessori',
    sub: 'On the Potential of Every Learner',
    body: '"The child is both a hope and a promise for mankind."',
  },
  {
    author: 'Malala Yousafzai',
    sub: 'On the Power of Education',
    body: '"One child, one teacher, one book, and one pen can change the world."',
  },
  {
    author: 'Martin Luther King Jr.',
    sub: 'On Thoughtful Education',
    body: '"The function of education is to teach one to think intensively and to think critically."',
  },
  {
    author: 'John Wooden',
    sub: 'On the Influence of a Teacher',
    body: '"A good teacher can inspire hope, ignite the imagination, and instil a love of learning."',
  },
];

const galleryItems: GalleryItem[] = [
  {
    src: 'assets/gallery/photo-01.jpg',
    alt: 'Students with teachers at Annual Day felicitation',
    caption: 'Annual Day felicitation with the faculty',
    label: 'Annual Day Felicitation',
    className: 'col-span-2 row-span-2',
  },
  { src: 'assets/gallery/photo-02.jpg', alt: 'A classroom moment with a teacher', caption: 'Classroom moments with our mentors', label: 'Classroom Moments' },
  { src: 'assets/gallery/photo-03.jpg', alt: 'Students with House Masters on House Day', caption: 'House Day cheer with our House Masters', label: 'House Day Cheer' },
  { src: 'assets/gallery/photo-04.jpg', alt: 'Students with sports coaches on the field', caption: 'On the field with our sports coaches', label: 'On the Field' },
  { src: 'assets/gallery/photo-05.jpg', alt: 'Students with science faculty in the lab', caption: 'Lab sessions with our science faculty', label: 'In the Laboratory' },
  {
    src: 'assets/gallery/photo-06.jpg',
    alt: 'Farewell moment with mentors',
    caption: "Farewell gratitude to our graduating batch's mentors",
    label: 'Farewell Gratitude',
    className: 'col-span-2',
  },
  { src: 'assets/gallery/photo-07.jpg', alt: 'Students with MUN faculty advisor', caption: 'MUN and journalism mentors guiding delegates', label: 'MUN Mentorship' },
  { src: 'assets/gallery/photo-08.jpg', alt: 'Students backstage with arts faculty', caption: 'Backstage before a school production, with our arts faculty', label: 'Behind the Curtain' },
];

const pillars = [
  {
    idx: '01',
    title: 'Confidence & Voice',
    copy: 'Empowering every learner to speak with courage, share ideas with clarity, and believe in the strength of their own potential.',
    tint: 'tint-a',
    align: 'align-right',
    reverse: false,
    parallax: 0.06,
    Icon: Megaphone,
  },
  {
    idx: '02',
    title: 'Knowledge & Curiosity',
    copy: 'Creating enthusiastic learners who explore beyond textbooks, question deeply, and find joy in understanding the world around them.',
    tint: 'tint-b',
    align: 'align-left',
    reverse: true,
    parallax: -0.05,
    Icon: BookOpen,
  },
  {
    idx: '03',
    title: 'Leadership & Service',
    copy: 'Shaping responsible leaders who lead with empathy, work for others, and create a meaningful difference in their communities.',
    tint: 'tint-a',
    align: 'align-right',
    reverse: false,
    parallax: 0.07,
    Icon: Flag,
  },
  {
    idx: '04',
    title: 'Culture & Heritage',
    copy: 'Connecting young minds with values, traditions, and stories that celebrate identity while embracing a diverse and changing world.',
    tint: 'tint-b',
    align: 'align-left',
    reverse: true,
    parallax: -0.06,
    Icon: Landmark,
  },
  {
    idx: '05',
    title: 'Growth & Resilience',
    copy: 'Encouraging students to face challenges with determination, learn from every experience, and grow stronger with every step.',
    tint: 'tint-a',
    align: 'align-right',
    reverse: false,
    parallax: 0.05,
    Icon: Sprout,
  },
  {
    idx: '06',
    title: 'Dreams & Possibilities',
    copy: 'Inspiring ambitious minds to imagine boldly, pursue their passions, and transform their aspirations into meaningful achievements.',
    tint: 'tint-b',
    align: 'align-left',
    reverse: true,
    parallax: -0.07,
    Icon: Sparkles,
  },
];

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [lightboxFocusIndex, setLightboxFocusIndex] = useState<number | null>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement | null>(null);
  const webglCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const reelProgressRef = useRef<HTMLDivElement | null>(null);
  const filmProgressRef = useRef<HTMLDivElement | null>(null);
  const scrubFillRef = useRef<HTMLDivElement | null>(null);
  const pillarsRailRef = useRef<HTMLDivElement | null>(null);
  const tributeRuleRef = useRef<HTMLDivElement | null>(null);
  const quoteTimerRef = useRef<number | null>(null);
  const quoteTouchStartX = useRef(0);
  const quoteNavRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.title = "Welham Boys' School - The Architects of Human Potential";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', "A scroll-driven cinematic film honoring the teachers of Welham Boys' School.");
    }
  }, []);

  useEffect(() => {
    if (!lightboxOpen) {
      document.body.classList.remove('lightbox-locked');
      return;
    }
    document.body.classList.add('lightbox-locked');
    lightboxCloseRef.current?.focus();
    return () => document.body.classList.remove('lightbox-locked');
  }, [lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeLightbox();
      }
      if (event.key === 'ArrowRight') {
        openLightboxAt(lightboxIndex + 1);
      }
      if (event.key === 'ArrowLeft') {
        openLightboxAt(lightboxIndex - 1);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [lightboxOpen, lightboxIndex]);

  useEffect(() => {
    quoteTimerRef.current = window.setTimeout(() => {
      setQuoteIndex((prev) => (prev + 1) % quoteItems.length);
    }, 5500);

    return () => {
      if (quoteTimerRef.current) {
        window.clearTimeout(quoteTimerRef.current);
      }
    };
  }, [quoteIndex]);

  useEffect(() => {
    if (window.innerWidth >= 768) return;
    const nav = quoteNavRef.current;
    if (!nav) return;
    const buttons = nav.querySelectorAll<HTMLElement>('.quote-side-btn');
    const activeBtn = buttons[quoteIndex];
    if (!activeBtn) return;

    // Scroll only inside the horizontal quote rail and never the main page.
    const targetLeft = activeBtn.offsetLeft - nav.clientWidth / 2 + activeBtn.clientWidth / 2;
    const boundedLeft = Math.max(0, Math.min(targetLeft, nav.scrollWidth - nav.clientWidth));
    nav.scrollTo({ left: boundedLeft, behavior: 'smooth' });
  }, [quoteIndex]);

  useEffect(() => {
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal], .fade-left, .fade-right'));
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );

    revealTargets.forEach((target) => revealObserver.observe(target));

    return () => revealObserver.disconnect();
  }, []);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      { threshold: 0.45 },
    );

    sections.forEach((section) => sectionObserver.observe(section));

    return () => sectionObserver.disconnect();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const heroSection = document.getElementById('hero');
    const reelSection = document.getElementById('reel');
    const pillarsSection = document.getElementById('pillars');
    const tributeSection = document.getElementById('tribute');
    const parallaxEls = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
    const reelShotsEls = Array.from(document.querySelectorAll<HTMLElement>('.reel-shot'));
    const reelCaptions = Array.from(document.querySelectorAll<HTMLElement>('.reel-caption'));
    const tributeEls = Array.from(document.querySelectorAll<HTMLElement>('[data-t-reveal]'));
    const heroVideo = document.getElementById('heroVideo') as HTMLVideoElement | null;
    const reelVideos = reelShotsEls
      .map((shot) => shot.querySelector('video'))
      .filter((video): video is HTMLVideoElement => Boolean(video));

    const reelDurations = new Array(reelVideos.length).fill(0);
    reelVideos.forEach((video, i) => {
      const updateDuration = () => {
        reelDurations[i] = video.duration || reelDurations[i];
      };
      video.addEventListener('loadedmetadata', updateDuration);
      video.addEventListener('canplay', updateDuration);
    });

    let heroDuration = 0;
    let heroScrub = 0;
    const updateHeroDuration = () => {
      if (!heroVideo) return;
      heroDuration = heroVideo.duration || heroDuration;
    };
    heroVideo?.addEventListener('loadedmetadata', updateHeroDuration);
    heroVideo?.addEventListener('canplay', updateHeroDuration);

    const reelState = {
      shotOpacity: new Array(reelShotsEls.length).fill(0),
      captionOpacity: new Array(reelCaptions.length).fill(0),
      localProgress: new Array(reelShotsEls.length).fill(0),
      overall: 0,
      fill: 0,
    };
    const parallaxState = parallaxEls.map(() => 0);
    const tributeState = tributeEls.map(() => 0);
    let railCurrent = 0;
    let tributeRuleCurrent = 0;
    let rafId = 0;

    const animate = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pageProgress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      if (filmProgressRef.current) {
        filmProgressRef.current.style.width = `${pageProgress}%`;
      }
      if (heroSection && heroVideo && heroDuration > 0 && !prefersReducedMotion) {
        const rect = heroSection.getBoundingClientRect();
        const targetProgress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
        heroScrub += (targetProgress - heroScrub) * 0.16;
        const targetTime = heroScrub * heroDuration;
        if (Math.abs(heroVideo.currentTime - targetTime) > 0.02) {
          heroVideo.currentTime = targetTime;
        }
        if (scrubFillRef.current) {
          scrubFillRef.current.style.width = `${heroScrub * 100}%`;
        }
      }

      if (reelSection) {
        const rect = reelSection.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        if (total > 0) {
          const rawProgress = Math.min(Math.max(-rect.top / total, 0), 1);
          reelState.overall += (rawProgress - reelState.overall) * 0.14;
          const count = reelShotsEls.length;
          const scaled = reelState.overall * count;
          const activeIdx = Math.min(Math.floor(scaled), count - 1);
          const local = scaled - activeIdx;

          reelState.fill += rawProgress * 100 - reelState.fill;
          if (reelProgressRef.current) {
            reelProgressRef.current.style.width = `${Math.max(0, Math.min(reelState.fill, 100))}%`;
          }

          reelShotsEls.forEach((shot, i) => {
            let targetOpacity = 0;
            if (i === activeIdx) targetOpacity = 1;
            if (i === activeIdx + 1) targetOpacity = Math.max(0, local - 0.7) / 0.3;
            if (i === activeIdx - 1) targetOpacity = Math.max(0, 0.3 - local) / 0.3;

            reelState.shotOpacity[i] += (targetOpacity - reelState.shotOpacity[i]) * 0.16;
            shot.style.opacity = `${reelState.shotOpacity[i]}`;

            const video = reelVideos[i];
            if (video && reelDurations[i] > 0 && !prefersReducedMotion && reelState.shotOpacity[i] > 0.02) {
              const localProgress = i === activeIdx ? local : i < activeIdx ? 1 : 0;
              reelState.localProgress[i] += (localProgress - reelState.localProgress[i]) * 0.16;
              const targetTime = Math.min(Math.max(reelState.localProgress[i], 0), 1) * reelDurations[i];
              if (Math.abs(video.currentTime - targetTime) > 0.02) {
                video.currentTime = targetTime;
              }
            }
          });

          reelCaptions.forEach((caption, i) => {
            const target = i === activeIdx ? 1 : 0;
            reelState.captionOpacity[i] += (target - reelState.captionOpacity[i]) * 0.15;
            const opacity = reelState.captionOpacity[i];
            caption.style.opacity = `${opacity}`;
            caption.style.transform = `translateY(${24 * (1 - opacity)}px)`;
          });
        }
      }

      if (pillarsSection && pillarsRailRef.current) {
        const rect = pillarsSection.getBoundingClientRect();
        const total = rect.height + window.innerHeight;
        const scrolled = window.innerHeight - rect.top;
        const target = Math.min(Math.max(scrolled / total, 0), 1) * 100;
        railCurrent += (target - railCurrent) * 0.16;
        pillarsRailRef.current.style.height = `${railCurrent}%`;
      }

      if (tributeSection) {
        const rect = tributeSection.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        if (total > 0) {
          const progress = Math.min(Math.max(-rect.top / total, 0), 1);
          tributeEls.forEach((el, i) => {
            const startAt = Number(el.getAttribute('data-t-reveal')) || 0;
            const local = Math.min(Math.max((progress - startAt) / 0.18, 0), 1);
            tributeState[i] += (local - tributeState[i]) * 0.17;
            const value = tributeState[i];
            el.style.opacity = `${value}`;
            if (el.classList.contains('tribute-title-line')) {
              el.style.transform = `translateY(${30 * (1 - value)}px) scale(${0.96 + value * 0.04})`;
            } else {
              el.style.transform = `translateY(${20 * (1 - value)}px)`;
            }
          });

          const ruleTarget = progress > 0.75 ? 1 : 0;
          tributeRuleCurrent += (ruleTarget - tributeRuleCurrent) * 0.1;
          if (tributeRuleRef.current) {
            tributeRuleRef.current.style.width = `${tributeRuleCurrent * 180}px`;
          }
        }
      }

      parallaxEls.forEach((el, i) => {
        const factor = Number(el.getAttribute('data-parallax')) || 0;
        const rect = el.getBoundingClientRect();
        const target = (rect.top + rect.height / 2 - window.innerHeight / 2) * factor;
        parallaxState[i] += (target - parallaxState[i]) * 0.13;
        el.style.transform = `translateY(${parallaxState[i]}px)`;
      });

      rafId = window.requestAnimationFrame(animate);
    };

    rafId = window.requestAnimationFrame(animate);

    const onScroll = () => {
      const shouldShow = window.scrollY > window.innerHeight * 0.8;
      setShowBackToTop((prev) => (prev === shouldShow ? prev : shouldShow));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      heroVideo?.removeEventListener('loadedmetadata', updateHeroDuration);
      heroVideo?.removeEventListener('canplay', updateHeroDuration);
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (prefersReducedMotion || isTouch) return;

    const hero = document.getElementById('hero');
    const heroTilt = document.getElementById('heroTilt');
    if (!hero || !heroTilt) return;

    const maxTilt = 8;
    const onMove = (event: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width;
      const relY = (event.clientY - rect.top) / rect.height;
      const rotateY = (relX - 0.5) * maxTilt * 2;
      const rotateX = (0.5 - relY) * maxTilt * 2;
      heroTilt.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    };

    const onLeave = () => {
      heroTilt.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    };

    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', onLeave);
    return () => {
      hero.removeEventListener('mousemove', onMove);
      hero.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  useEffect(() => {
    const canvas = webglCanvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 9);

    const ringGeo = new THREE.TorusGeometry(2.1, 0.09, 32, 160);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xb8860b,
      metalness: 0.85,
      roughness: 0.28,
      emissive: 0x3a2a05,
      emissiveIntensity: 0.4,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    scene.add(ring);

    const ring2Geo = new THREE.TorusGeometry(2.7, 0.03, 24, 160);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xc9a227,
      metalness: 0.9,
      roughness: 0.3,
      transparent: true,
      opacity: 0.5,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 2.4;
    scene.add(ring2);

    const particleCount = window.matchMedia('(hover: none), (pointer: coarse)').matches ? 180 : 420;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0xd4af37, size: 0.035, transparent: true, opacity: 0.5 });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const keyLight = new THREE.DirectionalLight(0xffe8b0, 1.1);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0x6b4423, 0.6);
    rimLight.position.set(-5, -3, -4);
    scene.add(rimLight);

    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let raf = 0;
    const animate = () => {
      const t = clock.getElapsedTime();
      const scrollRatio = window.scrollY / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);

      ring.rotation.z = t * 0.15 + scrollRatio * Math.PI * 2;
      ring.rotation.x = 0.3 + Math.sin(t * 0.2) * 0.1;
      ring2.rotation.z = -t * 0.1 - scrollRatio * Math.PI;
      particles.rotation.y = t * 0.02 + scrollRatio * 0.6;

      camera.position.x += (mouseX * 1.2 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 1.0 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(animate);
    };
    raf = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      ringGeo.dispose();
      ringMat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  const scrollToSection = (id: SectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const activeDark = activeSection === 'hero' || activeSection === 'reel' || activeSection === 'tribute';

  const openLightboxAt = (index: number) => {
    setLightboxIndex((index + galleryItems.length) % galleryItems.length);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    if (lightboxFocusIndex !== null) {
      const nextFocus = document.querySelectorAll<HTMLElement>('.gallery-frame')[lightboxFocusIndex];
      nextFocus?.focus();
    }
  };

  return (
    <div className="bg-beige text-espresso antialiased">
      <canvas id="webglCanvas" ref={webglCanvasRef} aria-hidden="true" />
      <div className="film-progress" id="filmProgress" ref={filmProgressRef} />

      <a
        href="#appreciation"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:text-offwhite"
      >
        Skip to content
      </a>

      <div className="content-layer">
        <div className={`brand-badge ${activeDark ? 'on-dark' : ''}`} id="brandBadge">
          <div className="brand-logo-frame">
            <img src="assets/welham-logo.png" alt="Elephant emblem" />
          </div>
          <div className="brand-text">
            <span className="brand-name">Welham Boys' School</span>
            <span className="brand-tag">Est. In 1937</span>
          </div>
        </div>

        <nav className="side-nav" aria-label="Section navigation">
          {sectionIds.map((id) => (
            <button
              key={id}
              className={`side-nav-dot ${activeSection === id ? 'active' : ''}`}
              data-target={id}
              aria-label={id}
              onClick={() => scrollToSection(id)}
            >
              <span className="side-nav-label">{id === 'reel' ? 'The Reel' : id}</span>
            </button>
          ))}
        </nav>

        <nav className="mobile-nav" aria-label="Section navigation">
          <button
            className={`mobile-nav-btn ${activeSection === 'hero' ? 'active' : ''}`}
            onClick={() => scrollToSection('hero')}
            aria-label="Hero"
          >
            <Home className="h-4 w-4" />
          </button>
          <button
            className={`mobile-nav-btn ${activeSection === 'reel' ? 'active' : ''}`}
            onClick={() => scrollToSection('reel')}
            aria-label="Reel"
          >
            <Clapperboard className="h-4 w-4" />
          </button>
          <button
            className={`mobile-nav-btn ${activeSection === 'pillars' ? 'active' : ''}`}
            onClick={() => scrollToSection('pillars')}
            aria-label="Craft"
          >
            <Compass className="h-4 w-4" />
          </button>
          <button
            className={`mobile-nav-btn ${activeSection === 'gallery' ? 'active' : ''}`}
            onClick={() => scrollToSection('gallery')}
            aria-label="Photos"
          >
            <ImageIcon className="h-4 w-4" />
          </button>
          <button
            className={`mobile-nav-btn ${activeSection === 'inspiration' ? 'active' : ''}`}
            onClick={() => scrollToSection('inspiration')}
            aria-label="Quotes"
          >
            <Quote className="h-4 w-4" />
          </button>
        </nav>

        <button className={`back-to-top ${showBackToTop ? 'show' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <ArrowUp className="h-5 w-5" />
        </button>

        <header id="hero" className="hero-wrap relative flex min-h-[100vh] min-h-[100svh] items-center justify-center overflow-hidden bg-brownsec">
          <video className="hero-video" id="heroVideo" muted playsInline preload="metadata" poster="assets/gallery/photo-01.jpg">
            <source src="assets/shots/shot-00-hero.mp4" type="video/mp4" />
          </video>
          <div className="hero-grade" />
          <div className="hero-vignette" />

          <div id="heroTilt" className="hero-tilt relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-5 md:px-6">
            <div className="mb-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 md:mb-6 md:gap-4">
              <span className="hero-kicker-line" />
              <p className="kicker-label text-[10px] uppercase text-amber md:text-sm">The Architects of Human Potential</p>
              <span className="hero-kicker-line" />
            </div>
            <h1 className="letter-reveal font-serif text-[12vw] font-bold leading-[1.05] text-offwhite gold-glow-text md:text-[5.5vw]" id="heroTitle">
              {'Welham Boys\' School'.split('').map((letter, index) => (
                <span key={`${letter}-${index}`} style={{ animationDelay: `${0.05 + index * 0.04}s` }}>
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              ))}
            </h1>
            <p className="mt-4 text-sm font-light tracking-wide text-offwhite/90 sm:text-base md:mt-6 md:text-2xl" id="heroSub">
              Celebrating Our Inspiring Educators
            </p>
          </div>

          <div className="scrub-hint">
            <span className="text-[9px] font-medium uppercase tracking-[0.35em] text-offwhite/60 md:text-[10px]">Scroll Down</span>
            <div className="scrub-track">
              <div className="scrub-fill" ref={scrubFillRef} />
            </div>
          </div>
        </header>

        <section id="appreciation" className="relative bg-beige py-16 md:py-40">
          <div className="mx-auto max-w-6xl px-5 md:px-16">
            <div className="grid items-start gap-8 md:grid-cols-[1fr_2px_1.3fr] md:gap-14">
              <div className="fade-left">
                <p className="kicker-label mb-4 text-xs uppercase text-gold md:mb-5 md:text-sm">A Tribute</p>
                <h2 className="font-serif text-2xl font-semibold leading-tight text-brownsec md:text-4xl" data-reveal>
                  Celebrating Those Who Shape Tomorrow
                </h2>
                <div className="gold-frame-line mt-6 w-16 md:mt-8" />
              </div>
              <div className="vertical-gold-line hidden h-full md:block" />
              <div className="fade-right space-y-5 md:space-y-6">
                <p className="drop-cap text-base leading-relaxed text-espresso/90 md:text-lg" data-reveal>
                  Ma'ams and Sirs, your guidance reaches far beyond the lessons taught within a classroom. You awaken <strong className="font-semibold text-brownsec">curiosity</strong>, nurture <strong className="font-semibold text-brownsec underline decoration-gold/70 underline-offset-4">confidence</strong>, and help us recognise the <strong className="font-semibold text-brownsec">potential</strong> that lies within each one of us.
                </p>
                <p className="text-base leading-relaxed text-espresso/90 md:text-lg" data-reveal>
                  With your <strong className="font-semibold text-brownsec underline decoration-gold/70 underline-offset-4">patience</strong>, <strong className="font-semibold text-brownsec">encouragement</strong>, and unwavering belief, you make learning more than an academic journey - you make it a path towards becoming <strong className="font-semibold text-brownsec">thoughtful, capable, and compassionate</strong> individuals.
                </p>
                <p className="text-base leading-relaxed text-espresso/90 md:text-lg" data-reveal>
                  Today, we celebrate the <strong className="font-semibold text-brownsec underline decoration-gold/70 underline-offset-4">dedication</strong>, <strong className="font-semibold text-brownsec">wisdom</strong>, and inspiration you bring into our lives. Thank you for helping us <strong className="font-semibold text-brownsec">learn with purpose</strong>, <strong className="font-semibold text-brownsec">grow with confidence</strong>, and <strong className="font-semibold text-brownsec underline decoration-gold/70 underline-offset-4">dream without limits</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="reel" className="reel-wrapper" style={{ height: '400vh' }}>
          <div className="reel-sticky" id="reelSticky">
            {reelShots.map((shot, i) => (
              <div key={`${shot.poster}-${i}`} className="reel-shot" data-shot={i}>
                <video muted playsInline preload="metadata" poster={shot.poster}>
                  <source src={shot.src} type="video/mp4" />
                </video>
                <div className="reel-shot-grade" />
              </div>
            ))}

            <div className="reel-caption-wrap">
              {reelShots.map((shot, i) => (
                <p key={shot.caption} className="reel-caption" data-caption={i}>
                  {shot.caption}
                </p>
              ))}
            </div>

            <div className="reel-progress-track">
              <div className="reel-progress-fill" ref={reelProgressRef} />
            </div>
          </div>
        </section>

        <section id="pillars" className="relative overflow-hidden bg-beigedark py-16 md:py-36">
          <div className="mx-auto max-w-6xl px-5 md:px-16">
            <div className="mb-12 max-w-xl md:mb-20" data-reveal>
              <p className="kicker-label mb-3 text-xs uppercase text-gold md:mb-4 md:text-sm">Their Craft</p>
              <h2 className="font-serif text-2xl font-semibold text-brownsec md:text-5xl">Celebrating Teaching Excellence</h2>
              <p className="mt-3 text-sm text-espresso/65 md:mt-4 md:text-base">Six qualities our teachers bring into every classroom, every single day.</p>
            </div>

            <div className="flex gap-4 md:gap-8">
              <div className="pillars-rail sticky top-32 hidden self-start md:block" style={{ height: '60vh' }}>
                <div className="pillars-rail-fill" ref={pillarsRailRef} />
              </div>

              <div className="flex-1 space-y-4 md:space-y-6" id="pillarsList">
                {pillars.map((pillar) => (
                  <div
                    key={pillar.idx}
                    className={`pillar-block ${pillar.tint} flex items-center gap-5 md:gap-10 ${pillar.reverse ? 'md:flex-row-reverse md:text-right' : ''}`}
                    data-reveal
                  >
                    <span className={`pillar-watermark ${pillar.align}`} data-parallax={pillar.parallax}>
                      {pillar.idx}
                    </span>
                    <div className="pillar-badge">
                      <pillar.Icon className="h-6 w-6 text-brownsec transition-colors duration-500 md:h-8 md:w-8" />
                    </div>
                    <div className={`relative z-10 flex-1 ${pillar.reverse ? 'md:ml-auto' : ''}`}>
                      <p className="pillar-kicker mb-1">Pillar {pillar.idx}</p>
                      <h3 className="mb-1.5 font-serif text-lg font-semibold text-brownsec md:text-2xl">{pillar.title}</h3>
                      <p className={`max-w-md text-sm text-espresso/65 md:text-base ${pillar.reverse ? 'md:ml-auto' : ''}`}>{pillar.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" className="relative bg-beige py-16 md:py-36">
          <div className="mx-auto max-w-6xl px-5 md:px-16">
            <div className="mx-auto mb-10 max-w-2xl text-center md:mb-20" data-reveal>
              <p className="kicker-label mb-3 text-xs uppercase text-gold md:mb-4 md:text-sm">Moments Together</p>
              <h2 className="font-serif text-2xl font-semibold text-brownsec md:text-5xl">With Our Teachers</h2>
              <p className="mt-3 text-sm text-espresso/70 md:mt-4 md:text-base">A gallery of memories from classrooms, corridors, and celebrations - captured with the people who shaped them.</p>
            </div>

            <div className="grid auto-rows-[110px] grid-cols-2 gap-2.5 sm:auto-rows-[128px] md:auto-rows-[200px] md:grid-cols-4 md:gap-4" id="galleryGrid">
              {galleryItems.map((item, index) => (
                <div
                  key={item.src}
                  className={`gallery-frame ${item.className ?? ''}`}
                  data-reveal
                  tabIndex={0}
                  role="button"
                  aria-label={`View photo: ${item.caption}`}
                  onClick={() => {
                    setLightboxFocusIndex(index);
                    openLightboxAt(index);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setLightboxFocusIndex(index);
                      openLightboxAt(index);
                    }
                  }}
                >
                  <img src={item.src} alt={item.alt} loading="lazy" />
                  <div className="gallery-overlay">
                    <span className="gallery-caption text-[11px] text-offwhite md:text-sm">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-xs text-espresso/50 md:mt-8" data-reveal>
              Tap any photograph to view it in full.
            </p>
          </div>
        </section>

        <section id="inspiration" className="relative overflow-hidden bg-beigedark py-16 md:py-36">
          <div className="mx-auto max-w-6xl px-5 md:px-16">
            <div className="mb-10 text-center md:mb-20" data-reveal>
              <p className="kicker-label mb-3 text-xs uppercase text-gold md:mb-4 md:text-sm">Words of Inspiration</p>
              <h2 className="font-serif text-2xl font-semibold text-brownsec md:text-5xl">Voices That Endure</h2>
            </div>

            <div className="relative grid items-start gap-6 md:grid-cols-[1fr_2fr] md:gap-16">
              <div ref={quoteNavRef} className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-col md:gap-6 md:px-0 md:pb-0" id="quoteNav">
                {quoteItems.map((item, i) => (
                  <button
                    key={item.author}
                    className={`quote-side-btn relative ${quoteIndex === i ? 'active' : ''}`}
                    onClick={() => {
                      setQuoteIndex(i);
                    }}
                  >
                    <span className="quote-progress-track" />
                    <span className="quote-side-name block text-xs uppercase text-brownsec">{item.author}</span>
                    <span className="quote-side-sub mt-1 block text-[11px] text-espresso/50">{item.sub}</span>
                  </button>
                ))}
              </div>

              <div className="relative min-h-[200px] md:min-h-[220px]">
                <div className="quote-mark-bg pointer-events-none absolute -top-4 left-0 select-none md:-top-10">"</div>
                <div
                  className="relative z-10"
                  id="quoteCarousel"
                  onTouchStart={(event) => {
                    quoteTouchStartX.current = event.touches[0]?.clientX ?? 0;
                  }}
                  onTouchEnd={(event) => {
                    const endX = event.changedTouches[0]?.clientX ?? 0;
                    const deltaX = endX - quoteTouchStartX.current;
                    if (Math.abs(deltaX) < 45) return;
                    setQuoteIndex((prev) => {
                      if (deltaX < 0) return (prev + 1) % quoteItems.length;
                      return (prev - 1 + quoteItems.length) % quoteItems.length;
                    });
                  }}
                >
                  {quoteItems.map((item, i) => (
                    <div key={item.author} className={`quote-slide ${quoteIndex === i ? 'active' : ''}`}>
                      <blockquote className="font-display text-xl leading-snug text-espresso italic md:text-4xl">{item.body}</blockquote>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="tribute" className="tribute-wrapper">
          <div className="tribute-sticky" id="tributeSticky">
            <video className="tribute-video" id="tributeVideo" muted playsInline loop preload="metadata" poster="assets/gallery/photo-08.jpg">
              <source src="assets/shots/shot-00-hero.mp4" type="video/mp4" />
            </video>
            <div className="tribute-grade" />
            <div className="tribute-grain" />

            <div className="tribute-content">
              <div className="tribute-laurel" data-t-reveal="0.02">
                <Leaf className="laurel-icon flip h-6 w-6 md:h-8 md:w-8" />
                <div className="tribute-diamond" />
                <Leaf className="laurel-icon h-6 w-6 md:h-8 md:w-8" />
              </div>

              <p className="tribute-kicker-line" data-t-reveal="0.08">
                In Closing
              </p>

              <h2 className="tribute-title-line" data-t-reveal="0.15">
                With Heartfelt Gratitude
              </h2>

              <p className="tribute-body-line" data-t-reveal="0.3">
                To every teacher who has guided, encouraged, and believed in us, thank you for making a lasting difference in our lives. Your lessons extend far beyond the classroom, shaping the way we think, act, and see the world.
              </p>

              <p className="tribute-subtitle-quote" data-t-reveal="0.42">
                You do more than teach lessons. You inspire possibilities.
              </p>

              <p className="tribute-body-line" data-t-reveal="0.55">
                Your patience when we struggle, your faith when we doubt ourselves, and your encouragement through every challenge remind us that growth takes time - and that every effort matters.
              </p>

              <p className="tribute-body-line" data-t-reveal="0.64">
                Because of you, learning becomes more than knowledge. It becomes confidence, character, curiosity, and the courage to dream bigger.
              </p>

              <div className="tribute-sig" data-t-reveal="0.72">
                <p className="tribute-sig-line1">With sincere appreciation,</p>
                <p className="tribute-sig-line2">The Students of Welham Boys' School.</p>
                <div className="tribute-sig-rule" ref={tributeRuleRef} />
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className={`lightbox-backdrop ${lightboxOpen ? 'open' : ''}`} onClick={(e) => (e.target === e.currentTarget ? closeLightbox() : undefined)} role="dialog" aria-modal="true">
        <button className="lightbox-close" ref={lightboxCloseRef} onClick={closeLightbox} aria-label="Close photo viewer">
          <X className="h-6 w-6" />
        </button>
        <button className="lightbox-nav-btn prev" onClick={() => openLightboxAt(lightboxIndex - 1)} aria-label="Previous photo">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button className="lightbox-nav-btn next" onClick={() => openLightboxAt(lightboxIndex + 1)} aria-label="Next photo">
          <ChevronRight className="h-6 w-6" />
        </button>
        <div className="w-full max-w-4xl">
          <img
            src={galleryItems[lightboxIndex].src}
            alt={galleryItems[lightboxIndex].alt}
            className="mx-auto max-h-[70vh] w-full rounded-lg object-contain md:max-h-[80vh]"
          />
          <p className="lightbox-caption-text mt-4 text-center text-sm text-offwhite/80">{galleryItems[lightboxIndex].caption}</p>
        </div>
      </div>
    </div>
  );
}
