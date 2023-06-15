const card = require('../models/card');
const BadRequestError = require('../utils/errors/BadRequestError');
const PermissionError = require('../utils/errors/PermissionError');
const NotFoundError = require('../utils/errors/NotFoundError');

module.exports.getCards = (req, res, next) => {
  card
    .find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  card
    .create({ name, link, owner: req.user._id })
    .then((newCard) => res.send(newCard))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError('Incorrect data passed to card creation methods'),
        );
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  card
    .findById(req.params.cardId)
    .orFail(() => next(new NotFoundError('Card with this id was not found')))
    .then((cardToDelete) => {
      if (req.user._id === cardToDelete.owner.toString()) {
        card.findByIdAndRemove(req.params.cardId).then(() => {
          res.send({ message: 'Card deleted' });
        });
      } else {
        next(new PermissionError('Unable to delete another users card'));
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .orFail(() => next(new NotFoundError('Card with this id was not found')))
    .then((targetCard) => res.send(targetCard))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .orFail(() => next(new NotFoundError('Card with this id was not found')))
    .then((targetCard) => res.send(targetCard))
    .catch(next);
};
