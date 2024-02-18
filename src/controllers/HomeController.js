import Aluno from '../models/Aluno';

class HomeController {
  async index(req, res) {
    const novoAluno = await Aluno.create({
      nome: 'Gabriel',
      sobrenome: 'Palitot',
      email: 'valorInvalido@gmail.com',
      idade: 20,
      peso: 80,
      altura: 1.77,
    });
    res.json(novoAluno);
  }
}

export default new HomeController();
