import PromotionController from './controllers/PromotionController.js';

class App {
  async run() {
    const controller = new PromotionController();
    await controller.run();
  }
}

export default App;
