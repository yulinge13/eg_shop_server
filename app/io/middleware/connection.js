module.exports = app => {
    return async (ctx, next) => {
      ctx.socket.emit('message', 'connected!');
      await next();
      // execute when disconnect.
      console.log('disconnection!');
    };
  };