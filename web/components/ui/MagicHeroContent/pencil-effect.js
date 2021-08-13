import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroContent from '../HeroContent';
import ImageOnDevice from '../ImageOnDevice';
import ImageWithSlide from '../ImageWithSlide';
import ImageWithSlideList from '../ImageWithSlideList';

gsap.registerPlugin(ScrollTrigger);

const compMap = {
  HeroContent,
  ImageOnDevice,
  ImageWithSlide,
  ImageWithSlideList
};

const presetAnimation = {
  sliderWithScrub: {}
};

class MagicHeroContentDefault extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getTarget(target) {
    const { name } = this.props;
    if (target && target.rule) {
      return CSSRulePlugin.getRule(target.rule);
    }
    return (name ? '.' + name + ' ' : '') + target;
  }

  applyTweens(tweens, timeline) {
    this.allTweens = [];
    tweens.forEach((tween) => {
      const { target, start, ...restTween } = tween;
      if (restTween.from && restTween.to) {
        this.allTweens.push((timeline || gsap).fromTo(this.getTarget(target), restTween.from, restTween.to, start));
      } else if (restTween.from) {
        this.allTweens.push((timeline || gsap).from(this.getTarget(target), restTween.from, start));
      } else if (restTween.to) {
        this.allTweens.push((timeline || to).to(this.getTarget(target), restTween.to, start));
      }
    });
  }

  getTimeline() {
    let { tweens, timeline, animation } = this.props;
    if (presetAnimation[animation]) {
      timeline = presetAnimation[animation];
    }
    return { tweens, timeline };
  }

  componentDidMount() {
    const { tweens, timeline } = this.getTimeline();
    const { tweens: tlTweens = [], ...restTimeline } = timeline || {};
    if (timeline) {
      this.tlObj = gsap.timeline(restTimeline);
      this.trigger = restTimeline.trigger;
      tlTweens && this.applyTweens(tlTweens, this.tlObj);
    }
    tweens && this.applyTweens(tweens);
    setTimeout(() => {
      restTimeline?.scrollTrigger && ScrollTrigger.refresh();
    }, 100);
  }
  componentWillUnmount() {
    this.killAll();
  }

  killAll() {
    this.allTweens?.forEach((tween) => {
      tween && tween.kill(true);
    });
    this.tlObj?.scrollTrigger && this.tlObj.scrollTrigger.kill(true);
    this.tlObj?.pause(0).kill(true);
    this.tlObj = null;
  }

  render() {
    const { name, content = {}, className = '' } = this.props;
    const { component, ...restContent } = content;
    const CmpToRender = compMap[component] || compMap.HeroContent;
    return (
      <div className={`sq-magic-hero-content-pencil ${className} ${name}`}>
        <CmpToRender {...restContent} />
      </div>
    );
  }
}

MagicHeroContentDefault.propTypes = {
  items: PropTypes.array
};

export default MagicHeroContentDefault;
