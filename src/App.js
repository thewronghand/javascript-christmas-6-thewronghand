import PromotionController from './controllers/PromotionController';

class App {
  async run() {
    const controller = new PromotionController();
    await controller.run();
  }
}

export default App;
