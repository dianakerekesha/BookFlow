import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HERO_REVEAL, SCROLL_ENTRANCE } from '@/constants/animationConfig';

gsap.registerPlugin(ScrollTrigger);

const animateHeroReveal = (element: HTMLDivElement | null) => {
  if (!element) return;

  gsap.fromTo(
    element,
    {
      clipPath: HERO_REVEAL.CLIP_START,
      scale: HERO_REVEAL.INITIAL_SCALE,
    },
    {
      clipPath: HERO_REVEAL.CLIP_END,
      scale: 1,
      duration: HERO_REVEAL.DURATION,
      ease: HERO_REVEAL.EASE,
    },
  );
};

const animateBooksSection = (section: HTMLDivElement | null) => {
  if (!section) return;

  const heading = section.querySelector('h2');
  const cards = section.querySelectorAll(
    SCROLL_ENTRANCE.CAROUSEL_ITEM_SELECTOR,
  );

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: SCROLL_ENTRANCE.TRIGGER_START,
      toggleActions: SCROLL_ENTRANCE.TOGGLE_ACTIONS,
    },
  });

  if (heading) {
    timeline.from(heading, {
      x: SCROLL_ENTRANCE.HEADING_X_OFFSET,
      opacity: 0,
      duration: SCROLL_ENTRANCE.HEADING_DURATION,
      ease: SCROLL_ENTRANCE.HEADING_EASE,
    });
  }

  if (cards.length > 0) {
    timeline.from(
      cards,
      {
        y: SCROLL_ENTRANCE.CARD_Y_OFFSET,
        opacity: 0,
        rotateX: SCROLL_ENTRANCE.CARD_ROTATE_X,
        transformPerspective: SCROLL_ENTRANCE.CARD_PERSPECTIVE,
        stagger: SCROLL_ENTRANCE.CARD_STAGGER,
        duration: SCROLL_ENTRANCE.CARD_DURATION,
        ease: SCROLL_ENTRANCE.CARD_EASE,
      },
      heading ? SCROLL_ENTRANCE.CARD_OVERLAP : undefined,
    );
  }
};

const animateSectionEntrance = (element: HTMLDivElement | null) => {
  if (!element) return;

  gsap.from(element, {
    y: SCROLL_ENTRANCE.SECTION_Y_OFFSET,
    opacity: 0,
    duration: SCROLL_ENTRANCE.SECTION_DURATION,
    ease: SCROLL_ENTRANCE.SECTION_EASE,
    scrollTrigger: {
      trigger: element,
      start: SCROLL_ENTRANCE.TRIGGER_START,
      toggleActions: SCROLL_ENTRANCE.TOGGLE_ACTIONS,
    },
  });
};

export const useHomepageIntroAnimation = () => {
  const containerRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const newBooksRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const suggestedBooksRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      animateHeroReveal(sliderRef.current);
      animateBooksSection(newBooksRef.current);
      animateBooksSection(suggestedBooksRef.current);
      animateSectionEntrance(categoriesRef.current);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return {
    containerRef,
    sliderRef,
    newBooksRef,
    categoriesRef,
    suggestedBooksRef,
  };
};
