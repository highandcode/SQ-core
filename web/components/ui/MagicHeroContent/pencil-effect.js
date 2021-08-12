import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroContent from '../HeroContent';
import ImageOnDevice from '../ImageOnDevice';
import ImageWithSlide from '../ImageWithSlide';

gsap.registerPlugin(ScrollTrigger);

const compMap = {
  HeroContent,
  ImageOnDevice,
  ImageWithSlide
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
      if (restTween.from) {
        this.allTweens.push((timeline || gsap).from(this.getTarget(target), restTween.from, start));
      }
      if (restTween.to) {
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
    if (timeline) {
      const { tweens: tlTweens = [], ...restTimeline } = timeline;
      this.tlObj = gsap.timeline(restTimeline);
      this.trigger = restTimeline.trigger;
      tlTweens && this.applyTweens(tlTweens, this.tlObj);
    }
    tweens && this.applyTweens(tweens);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }
  async componentWillUnmount() {
    this.allTweens.forEach((tween) => {
      tween && tween.kill(true);
    });
    (await this.tlObj.scrollTrigger) && this.tlObj.scrollTrigger.kill(true);
    this.tlObj.pause(0).kill(true);
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
