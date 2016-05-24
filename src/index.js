/**
 Copyright 2016 DevTheory, LLC. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
 or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

/**
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Gardener Facts for a garden fact"
 *  Alexa: "Here's your garden fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.3c4b2b5b-0058-4479-b8e4-c9e53811761b"; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing garden facts.
 */
var GARDEN_FACTS = [
    "There are at least 10,000 varieties of tomatoes, from small cherry ones to Ponderosa, which can weigh over three pounds.",
    "The tomato first grew as wild, cherry-sized berries in the South American Andes. The tomato as we know it today was developed in Mexico.",
    "Tomatoes are the world’s most popular fruit! More than 60 million tons are produced every year. That’s 16 million tons more than No.2 — the banana.",
    "Tomatoes are the fruit of a vine that’s native to South America.",
    "Lycopene, a powerful antioxidant that is abundant in tomatoes and tomato products, is widely thought to help in the prevention of a variety of maladies.",
    "Tomatoes are an excellent source of vitamin C. One medium tomato provides 40% of the recommended daily amount! ",
    "Borage flowers can be prepared in an infusion and served as cold or hot tea. ",
    "Watermelons are actually vegetables, related to pumpkins, cucumbers and squash.",
    "Watermelons are healthy! They contain no fat or cholesterol and are high in fiber content, potassium and vitamins A and C.",
    "The world record-holding watermelon was more than 260 lbs.",
    "The first cookbook that was published in 1176 contained a recipe for watermelon rind pickles.",
    "Bell peppers are a great source of vitamin C. They contain twice as much (by weight) as citrus fruits!",
    "Ancient Greeks and Romans thought basil would only grow if you screamed wild curses and shouted while sowing the seeds.",
    "Basil is a great source of vitamin A, magnesium, potassium and iron.",
    "Basil oil is a traditional treatment for insect bites and bee stings.",
    "Cilantro was one of the plants growing in the Hanging Gardens of Babylon more than 2,500 years ago!",
    "Cilantro is a member of the carrot family.",
    "Cucumbers are believed to have originated more than 10,000 years ago in southern Asia.",
    "Cucumbers have the highest water content of any vegetable.",
    "Although considered a vegetable when cooking, squash is actually a fruit.",
    "Squash is a great source of beta carotene, a powerful antioxidant.",
    "Eggplants are members of the potato family.",
    "People of many cultures going back to ancient Greece have used thyme to flavor cheeses and liquors.",
    "An old English tradition is to plant large patches of thyme as playgrounds for faeries.",
    "Got a cold? Green sweet bell peppers have twice the vitamin C of oranges. Red and yellow bell peppers have four times as much.",
    "Onions, apples and potatoes all have the same taste. The difference in flavor is caused by their smell. Pinch your nose and try it – they will all taste sweet.",
    "Broccoli and cauliflower are the only vegetables that are also flowers!",
    "Ounce for ounce, Broccoli has more vitamin C than an orange and as much calcium as a glass of milk.",
    "Onions make you cry because they are full of sulphuric chemicals, which irritate your tear ducts. Sulphur is the same gas which is produced by volcanoes when they erupt."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * Gardener is a child of AlexaSkill.
 */
var Gardener = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Gardener.prototype = Object.create(AlexaSkill.prototype);
Gardener.prototype.constructor = Gardener;

Gardener.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("Gardener onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Gardener.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("Gardener onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Gardener.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("Gardener onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Gardener.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Gardener Facts tell me a garden fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random garden fact from the garden facts list
    var factIndex = Math.floor(Math.random() * GARDEN_FACTS.length);
    var fact = GARDEN_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your garden fact: " + fact;

    response.tellWithCard(speechOutput, "Gardener Facts", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the Gardener skill.
    var gardener = new Gardener();
    gardener.execute(event, context);
};
