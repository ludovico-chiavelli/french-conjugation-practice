import { conjugate } from "conjugation-fr"
import allVerbs from "../verbs-list/allVerbs"
import irregularVerbs from "../verbs-list/irregularVerbs"
import mostCommonVerbs from "../verbs-list/mostCommonVerbs"

const generateExercises = (selectedOptions) => {
    const sTenses = selectedOptions.getSelectedTenses()
    const sCategories= selectedOptions.getSelectedCategories()
    const sPronouns= selectedOptions.getSelectedPronouns()
    const sVerbs = selectedOptions.getSelectedVerbs()[0]
    const sNum = selectedOptions.getSelectedAmount()

    const filtered = (verbList) => {
        return verbList.filter((verb) => (
            sCategories.includes("irregular") || !irregularVerbs.includes(verb)
        )).filter((verb) => sCategories.includes(verb.slice(-2)))
    }

    let verbPool = null

    switch(sVerbs){
        case "All verbs":
            verbPool = filtered(allVerbs)
            break
        case "Most common verbs":
            verbPool = filtered(mostCommonVerbs)
            break
        default:
            break
    }


    const pronounIndeces = {
        'je': 0,
        'tu': 1,
        'il/elle/on': 2,
        'nous': 3,
        'vous': 4,
        'ils/elles/ons': 5
    }

    const generatedList = []

    for (let i = 0; i < sNum; i++) {
        let ranTense = sTenses[Math.floor(Math.random() * sTenses.length)].toLowerCase()
        // let ranCategory = sCategories[Math.floor(Math.random() * sCategories.length)].toLowerCase()
        let ranPronoun = sPronouns[Math.floor(Math.random() * sPronouns.length)].toLowerCase()

        let ranVerb = verbPool[Math.floor(Math.random() * verbPool.length)]
        let conjVerb = conjugate(ranVerb, "indicative", ranTense)

        let exercise = {
            tense: ranTense,
            pronoun: ranPronoun,
            verbToConjugate: ranVerb,
            conjugatedVerb: conjVerb[pronounIndeces[ranPronoun]]["verb"]
        }

        generatedList.push(exercise)
    }

    return generatedList
}

export default generateExercises