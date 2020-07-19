
const ExerciseModel = require('./exercise.model')


exports.fetchAllExercises = async (req,res)=>{
    Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));


}

exports.create = async(req,res)=>{
    try{
        await ExerciseModel.creae(req.body, async function(err,exercise){
        res.send({
            success: true,
            exercise: exercise
        })
    })
    }catch (e) {
        res.send({
            success: false,
            message: e.message
        })
    }
}

exports.fetchExercise = async(req,res)=>{
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));

}

exports.delete = async(req,res)=>{
    Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));

}

exports.update = async (req,res)=>{
    Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
}

module.exports = router;
