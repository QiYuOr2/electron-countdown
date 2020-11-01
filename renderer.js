const { ipcRenderer } = require('electron');
const Timer = require('easytimer.js').Timer;

const timer = new Timer({
  precision: 'seconds',
});

/**
 * 开始倒计时
 * @param {*} is_test 是否为测试
 */
function startWork() {
  const timerShow = document.getElementById('timer-container-show');
  const timerContainer = document.getElementById('timer-container');
  const hour = Number(document.getElementById('select-houer').value);
  const minute = Number(document.getElementById('select-minute').value);
  const second = Number(document.getElementById('select-second').value);

  if (!hour && !minute && !second) {
    return alert('请输入倒计时起始时间');
  }

  timer.start({
    countdown: true,
    startValues: {
      hours: hour,
      minutes: minute,
      seconds: second,
    },
  });

  timerContainer.style.display = 'none';
  timerShow.style.display = 'flex';
  timerShow.innerHTML = timer.getTimeValues().toString();
  let noticed = false;

  timer.addEventListener('secondsUpdated', () => {
    const { seconds, minutes } = timer.getTimeValues();

    if (seconds === 0 && minutes === 0) {
      if (!noticed) {
        timerShow.style.display = 'none';
        document.getElementById('timer-container-finish').style.display =
          'flex';

        noticed = true;
        notification();
      }
    } else {
      // 显示时间
      timerShow.innerHTML = timer.getTimeValues().toString();
    }
  });
}

/**
 * 重开倒计时
 */
function resetTimer() {
  document.getElementById('timer-container').style.display = 'flex';
  document.getElementById('timer-container-finish').style.display = 'none';
  document.getElementById('select-houer').value = '0';
  document.getElementById('select-minute').value = '0';
  document.getElementById('select-second').value = '0';
}

/**
 * 发送倒计时结束事件到主线程
 */
async function notification() {
  await ipcRenderer.invoke('work-notification');
}

// 关闭窗体
document.getElementById('close').addEventListener('click', async () => {
  await ipcRenderer.invoke('window-close');
});

// 最小化窗体
document.getElementById('small').addEventListener('click', async () => {
  await ipcRenderer.invoke('window-small');
});

// 开始倒计时
document.getElementById('start-work').addEventListener('click', () => {
  startWork();
});

// 复原
document.getElementById('reset').addEventListener('click', () => {
  resetTimer();
});
