/**
 * @author Mauricio J Mondragon R <mauro102189@gmail.com>
 */

 // Input scores
var input1 = "[{\"category\":\"Red\",\"source1\":20,\"source2\":30,\"source3\":40,\"source4\":50},{\"category\":\"Yellow\",\"source1\":30,\"source2\":10,\"source3\":40,\"source4\":50}]";
var input2 = "[{\"category\":\"Red\",\"source1\":20,\"source2\":30,\"source3\":40,\"source4\":50},{\"category\":\"Yellow\",\"source1\":30,\"source2\":10,\"source3\":40,\"source4\":50}]";
var input3 = "[{\"category\":\"cat1\",\"src1\":20,\"src2\":30,\"src3\":40,\"src4\":50,\"src5\":50},{\"category\":\"cat1\",\"src1\":10,\"src2\":0,\"src3\":20,\"src4\":20,\"src5\":100}]";

/**
 *  Convert score for each source in ranks
 * @param {string} input 
 * @returns {Object[]}
 */
function convertToRanks(input){
    var scores = new Set();
    var finalScore = [];
    //Convert the string Json to Object
    var inputScores = JSON.parse(input);
    for(var i=0; i < inputScores.length; i++){
        let inputScore = inputScores[i];
        let inputRank = getRanks(inputScore);
        finalScore.push(inputRank);
        //Store the avg score for the category
        scores.add(inputRank.final_rank);
    }
    let finalRanks = Array.from(scores).sort(sortDesc);
    //Calculate the final rank
    finalScore = getFinalRanks(finalScore, finalRanks);
    return finalScore;
}

/**
 * Calculate the final rank by taking average of source
 * scores for each category 
 * @param {Object} inputScore 
 * @returns {Object}
 */
function getRanks(inputScore){
    let sortRanks = [];
    let props = Object.keys(inputScore);
    let avgScore = 0;
    for(let i=0; i < props.length; i++){
        if(props[i] !== 'category'){
            let score = inputScore[props[i]];
            //Store the each score for the source in array
            sortRanks.push(score);
            //Adding score to calculate the avg
            avgScore += score;
        }
    }
    //Calculate the avg for final score of category
    avgScore = avgScore / (props.length - 1);
    //Calculate the ranks, sort the array values descending.
    //The position in the array is the rank of the score   
    sortRanks = sortRanks.sort(sortDesc);
    var sourceRanks = getSourceRanks(inputScore, sortRanks);
    sourceRanks.final_rank = avgScore;
    return sourceRanks;
}

/**
 * Convert score for each source in ranks based on their values
 * @param {Object[]} sources 
 * @param {number[]} ranks Sorted array with the scores
 */
function getSourceRanks(sources, ranks){
    for(const prop in sources){
        if(prop !== 'category'){
            sources[prop] = getRank(sources[prop], ranks);
        }
    }
    return sources;
}

/**
 * Get the rank (position of the array) 
 * @param {number} score 
 * @param {number[]} ranks Sorted array with the scores
 * @param {number}
 */
function getRank(score, ranks)
{
    for(let i=0; ranks.length; i++){
        if(ranks[i] == score)
            return i + 1;
    }
}

/**
 * Assign the rank to the final score
 * @param {Object[]} finalScore 
 * @param {number[]} finalRanks sorted array with the scores
 * @returns {Object[]}
 */
function getFinalRanks(finalScore, finalRanks)
{
    finalScore.forEach(function(inputScore){
        let rank = getRank(inputScore.final_rank, finalRanks);
        inputScore.final_rank = rank;
    });
    return finalScore;
}

/**
 * Criteria to sort the array
 * @param {number} a 
 * @param {number} b 
 * @returns {number}
 */
function sortDesc(a,b){
    return b-a;
}

//Print the ouputs
console.log("Output 1");
console.log(JSON.stringify(convertToRanks(input1)));
console.log("Output 2");
console.log(JSON.stringify(convertToRanks(input2)));
console.log("Output 3");
console.log(JSON.stringify(convertToRanks(input3)));