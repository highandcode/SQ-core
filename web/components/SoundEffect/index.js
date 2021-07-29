import React from 'react';
import PropTypes from 'prop-types';
import { resolveFile } from 'sq-core/web/cordova';
import ChipsSOund from './effects/chips-sound.mp3';
import WinnerSound from './effects/winner-sound.m4a';
import TickTock from './effects/tick-tok-sound2.m4a';
import SeeCards from './effects/card-open.m4a';

const _sounds = {
  chips: ChipsSOund,
  winner: WinnerSound,
  ticktock: TickTock,
  seecards: SeeCards
};

class SoundEffect extends React.Component {
  constructor(props) {
    super(props);
  }

  playAudio() {
    try {
      const prom = this.refAudio.play();
      if (prom) {
        prom.then(() => {}).catch(() => {});
      }
    } catch (e) {}
  }
  stopAudio() {
    try {
      const prom = this.refAudio.pause();
      if (prom) {
        prom.then(() => {}).catch(() => {});
      }
      this.refAudio.currentTime = 0;
    } catch (e) {}
  }
  componentDidMount() {
    if (this.props.play === true) {
      this.playAudio();
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.play !== prevProps.play) {
      if (this.props.play) {
        this.playAudio();
      } else if (this.props.play === false) {
        this.stopAudio();
      }
    }
  }

  render() {
    const { name = 'chips' } = this.props;
    return <>{_sounds[name] && <audio src={resolveFile(_sounds[name])} ref={(audio) => (this.refAudio = audio)} />}</>;
  }
}

SoundEffect.propTypes = {
  name: PropTypes.string,
  play: PropTypes.bool
};

export default SoundEffect;
