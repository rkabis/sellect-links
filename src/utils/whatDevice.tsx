const detectMobile = {
  Android: function() {
    return navigator.userAgent.match(/Android/i)
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i)
  }
}

const whatDevice = () => {
  if (detectMobile.Android()) {
    return 'android'
  } else if (detectMobile.iOS()) {
    return 'apple'
  } else {
    return 'web'
  }
}

export default whatDevice