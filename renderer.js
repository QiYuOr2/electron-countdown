const { ipcRenderer } = require('electron');
const Timer = require('easytimer.js').Timer;

const timer = new Timer({
  precision: 'seconds',
});

/**
 * 开始倒计时
 * @param {*} is_test 是否为测试
 */
function startWork(is_test = false) {
  let timerContainer = document.getElementById('timer-container');
  timer.start({
    countdown: true,
    startValues: is_test
      ? {
          seconds: 5,
        }
      : {
          minutes: 18,
        },
  });

  timerContainer.innerHTML = timer.getTimeValues().toString();

  timer.addEventListener('secondsUpdated', () => {
    const { seconds, minutes } = timer.getTimeValues();

    if (seconds === 0 && minutes === 0) {
      timerContainer.style.backgroundColor = 'red';
      timerContainer.style.color = 'white';
      notification();
    } else {
      timerContainer.innerHTML = timer.getTimeValues().toString();
    }
  });
}

/**
 * 发送倒计时结束事件到主线程
 */
async function notification() {
  await ipcRenderer.invoke('work-notification');
}

// 开始倒计时
document.getElementById('start-work').addEventListener('click', () => {
  startWork();
});

// 测试倒计时
document.getElementById('start-test').addEventListener('click', () => {
  startWork(true);
});
