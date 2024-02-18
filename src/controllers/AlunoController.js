import Aluno from '../models/Aluno';
import Foto from '../models/Foto';

class AlunoController {
  async index(req, res) {
    try {
      const alunos = await Aluno.findAll(
        {
          attributes: ['id',
            'nome',
            'sobrenome',
            'email',
            'idade',
          ],
          order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
          include: {
            model: Foto,
            attributes: ['filename', 'url'],
          },
        },
      );
      res.json(alunos);
    } catch (e) {
      return res.json(null);
    }
  }

  async store(req, res) {
    try {
      const aluno = await Aluno.create(req.body);

      const {
        id: id1, nome, sobrenome, email,
      } = aluno;

      return res.json({
        id: id1, nome, sobrenome, email,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID'],
        });
      }

      const aluno = await Aluno.findByPk(id, {
        attributes: ['id',
          'nome',
          'sobrenome',
          'email',
          'idade',
        ],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: ['filename', 'url'],
        },
      });

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno Não Existe'],
        });
      }

      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID'],
        });
      }

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno Não Existe'],
        });
      }

      const alunoAtualizado = await aluno.update(req.body);

      const {
        id: id1, nome, sobrenome, email,
      } = alunoAtualizado;

      res.json({
        id: id1, nome, sobrenome, email,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID'],
        });
      }

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno Não Existe'],
        });
      }

      await aluno.destroy();
      return res.json({ apagado: true });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new AlunoController();
