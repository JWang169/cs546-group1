const express = require('express');
const router = express.Router();
const data = require('../data');
const tutorData = data.tutors;

router.post('/', async (req, res) => {
    let tutorPostData = req.body;

	try {
		let {email, firstName, lastName, town, state, tutorSubjects, availability} = tutorPostData;
		let newPost = await tutorData.addTutor(email, firstName, lastName, town, state, tutorSubjects, availability);
		res.status(200).json(newPost);
	} catch (e) {
		res.status(400).json({error: e});
	}
});

router.get('/:id', async (req, res) => {
    try {
        let tutor = await tutorData.getTutor(req.params.id);
        res.status(200).json(tutor);
    } catch (e) {
        res.status(404).json({error: e});
    }
});

router.get('/', async (req, res) => {
    try {
        let tutorList = await tutorData.getAlltutors();
        res.status(200).json(tutorList);
    } catch (e) {
        res.status(400).json({error: e});
    }
});

router.patch('/:id', async (req, res) => {
	let tutorPatchData = req.body;
    
    try {
        await tutorData.getTutor(req.params.id);
    } catch (e) {
        res.status(404).json({error: e});
    }

    try {
        let updatedTutor = await tutorData.updateTutor(req.params.id, tutorPatchData);
        res.status(200).json({updatedTutor})
    } catch (e) {
        res.status(400).json({error: e});
    }
});

router.delete('/:id', async (req, res) => {
	try {
        let removedTutor = await tutorData.removetutor(req.params.id);
        res.status(200).json(removedTutor);
    } catch (e) {
        res.status(404).json({error: e});
    }
});

module.exports = router;