// 状态模式：状态变化时改变行为

// 1.状态：表示对象的内部状态，决定了对象的行为。一个对象可以有多个状态，每个状态都有独立的行为。

// 2.上下文（Context）：包含一个对状态的引用，并提供了一个接口，用于状态的切换和行为的执行。上下文可以在不同状态之间进行切换。

// 3.抽象状态（State）：定义了所有具体状态类的公共接口和行为。状态可以是抽象的，也可以是具体的。

// 4.具体状态（Concrete State）：实现了抽象状态的接口和行为，每个具体状态对应一个特定的内部状态。


type IPlayState = {
  state: 'play';
  pause(): void;
  stop(): void;
}

type IPauseState = {
  state: 'pause';
  play(): void;
  stop(): void;
}

type IStopState = {
  state: 'stop';
  play(): void;
}


// play, pause, stop 为状态的行为, 不同的状态对应的行为不同
type VideoState = IPlayState | IPauseState | IStopState

const PlayState: VideoState = {
  state: 'play',

  pause(): void {
    console.log("开始状态 => 暂停视频！");
  },

  stop(): void {
    console.log("开始状态 => 停止视频！");
  }
}

const PauseState: VideoState = {
  state: 'pause',

  play(): void {
    console.log("暂停状态 => 继续播放视频！");
  },

  stop(): void {
    console.log("暂停状态 => 视频停止！");
  }
}

const StopState: VideoState = {
  state: 'stop',

  play(): void {
    console.log("停止状态 => 重新开始播放视频！");
  }
}

// Context
class VideoPlayer {
  private state: VideoState;

  constructor(initialState: VideoState) {
    this.state = initialState;
  }

  setState(state: VideoState): void {
    this.state = state;
  }

  play(): void {
    if (this.state.state !== 'play') {
      this.state.play();
      this.setState(PlayState);
    }
  }

  pause(): void {
    if (this.state.state === 'play') {
      this.state.pause();
      this.setState(PauseState);
    }
  }

  stop(): void {
    if (this.state.state !== 'stop') {
      this.state.stop();
      this.setState(StopState);
    }
  }
}

// 使用
const videoPlayer = new VideoPlayer(StopState);
videoPlayer.play();  // 输出 "停止状态 => 重新开始播放视频！"
videoPlayer.pause(); // 输出 "开始状态 => 暂停视频！"
videoPlayer.play();  // 输出 "暂停状态 => 继续播放视频！"
videoPlayer.stop();  // 输出 "开始状态 => 停止视频！"
videoPlayer.play();  // 输出 "停止状态 => 重新开始播放视频！"

