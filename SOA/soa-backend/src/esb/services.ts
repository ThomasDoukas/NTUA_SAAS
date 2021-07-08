const BASE_URL = 'http://localhost:3000/';

export const services = {
"services": [
    {
        "service_title": "Auth Service",
        "service_description": "Service for user authentication and authorization. This service provides with essential functionalities to manage user database",
        "endpoints": [
            {
                "endpoint_title": "Log In",
                "endpoint_description": "User must provide email and password in order to successfully connect to the system. This endpoint will return: user email, user database id and a single JWT which can be used later to access protected application endpoints",
                "request_type": "POST",
                "parameters": "User email, User password as request body",
                "results": "User Id, User email, User personalized JWT",
                "url_destination": BASE_URL + "saas/soa/auth/login"
            },
            {
                "endpoint_title": "Sign Up",
                "endpoint_description": "Create a new user account. User password will be encrypted. Like Log In, this functionality will return a single JWT for accessing protected application endpoints.",
                "request_type": "POST",
                "parameters": "User email, Username, User password, User first name, User last name, User birthday as request body",
                "results": "User Id, User email. User personalized JWT",
                "url_destination": BASE_URL + "saas/soa/auth/signup"
            },
            {
                "endpoint_title": "Create New User",
                "endpoint_description": "Creates and stores new user in database. Sign Up endpoint used this functionality.",
                "request_type": "POST",
                "parameters": "User email, Username, User password, User first name, User last name, User birthday as request body",
                "results": "User email, Username, User first name, User last name, User birthday (Does NOT  return user password)",
                "url_destination": BASE_URL + "saas/soa/users"
            },
            {
                "endpoint_title": "Find all users",
                "endpoint_description": "Returns information for all user accounts stored in Users databases.",
                "request_type": "GET",
                "parameters": "-",
                "results": "Users account in JSON format",
                "url_destination": BASE_URL + "saas/soa/users"
            },
            {
                "endpoint_title": "Find single user from Id",
                "endpoint_description": "Return user account info based on user id.",
                "request_type": "GET",
                "parameters": "User Id as URL params",
                "results": "User account in JSON format",
                "url_destination": BASE_URL + "saas/soa/users/:userId"
            },
            {
                "endpoint_title": "Update user account",
                "endpoint_description": "User can change the information stored in his account. User must be logged in and can only update his own account.",
                "request_type": "PATCH",
                "parameters": "User Id as URL params and User email, Username, User password, User first name, User last name, User birthday as request body",
                "results": "User new account information in JSON format",
                "url_destination": BASE_URL + "saas/soa/users/:userId",
                "comment": "Requires valid JWT."
            },
            {
                "endpoint_title": "Delete user account",
                "endpoint_description": "User can permanently delete his account. User must be logged in and can only delete his account.",
                "request_type": "DELETE",
                "parameters": "User Id as URL params",
                "results": "User new account information in JSON format",
                "url_destination": BASE_URL + "saas/soa/users/:userId",
                "comment": "Requires valid JWT."
            },
        ]
    },
    {
        "service_title": "Questions-Answers Service",
        "service_description": "This service provides the essential functionalities for Question-Answer management. User will be able to browse through different questions and answers in Q2D application. User can create new or manage already existing Questions and Answers. Application provides the ability to categorize questions using specific labels-keywords.",
        "endpoints": [
            {
                "endpoint_title": "Create question",
                "endpoint_description": "User creates new question",
                "request_type": "POST",
                "parameters": "Question title, Question body, User email(createdBy), Question labels as request body",
                "results": "New question as stored in database",
                "url_destination": BASE_URL + "saas/soa/questions",
                "comment" : "Requires valid JWT. Question labels must have specific stricture: [{\"label_title\": \"label1\"}, {\"label_title\": \"label2\"} , ...]"
            },
            {
                "endpoint_title": "Custom search questions",
                "endpoint_description": "User can browse through all stored questions in database using advanced custom search criteria. Specifically we can retrieve question that have been created in between specific dates and/or by a specific user (by email). User can also categorize the question according to one or more keywords. We are very happy to announce that a full text search in question title and body has been implemented.",
                "request_type": "POST",
                "parameters": "fromDate, toDate, email, textSearch, labels as request body.",
                "results": "A JSON object with multiple question elements that satisfy given conditions.",
                "url_destination": BASE_URL + "saas/soa/questions/search",
                "comment": "Parameters are optional and can be used in many different combinations. Multiple conditions will return an intersection of questions. Question labels must have specific stricture (different than in create question endpoint): [\"label1\", \"label2\"}, ...]"
            },
            {
                "endpoint_title": "Find user's questions",
                "endpoint_description": "Find all questions of a single user",
                "request_type": "POST",
                "parameters": "User email as request parameter.",
                "results": "A JSON object with multiple questions created by the same user",
                "url_destination": BASE_URL + "saas/soa/questions/usersQuestions",
                "comment": "Requires valid JWT."
            },
            {
                "endpoint_title": "Find single question",
                "endpoint_description": "Returns information about a specific question according to question Id.",
                "request_type": "GET",
                "parameters": "Question Id as URL param.",
                "results": "Question data in JSON format.",
                "url_destination": BASE_URL + "saas/soa/questions/:questionID"
            },
            {
                "endpoint_title": "Update question",
                "endpoint_description": "User has the ability to update question fields. User can only update his own questions.",
                "request_type": "PATCH",
                "parameters": "Question title, Question body, User email(createdBy), and Question labels as request params and Question Id as URL param.",
                "results": "New question as stored in database in JSON format",
                "url_destination": BASE_URL + "saas/soa/questions/:questionId",
                "comment": "Requires valid JWT. Question labels must have specific stricture: [{\"label_title\": \"label1\"}, {\"label_title\": \"label2\"} , ...]"
            },
            {
                "endpoint_title": "Delete question",
                "endpoint_description": "User has the ability to permanently delete his own question.",
                "request_type": "DELETE",
                "parameters": "Question Id as URL param.",
                "results": "-",
                "url_destination": BASE_URL + "saas/soa/questions/:questionId",
                "comment": "Requires valid JWT."
            },
            {
                "endpoint_title": "Create answer",
                "endpoint_description": "User creates new answer",
                "request_type": "POST",
                "parameters": "Answer Body, User email(Created By), Question Id as request params.",
                "results": "Returns new answer as stored in database.",
                "url_destination": BASE_URL + "saas/soa/answers",
                "comment" : "Requires valid JWT."
            },
            {
                "endpoint_title": "Find all answers",
                "endpoint_description": "Find all answers stored in database.",
                "request_type": "POST",
                "parameters": "-",
                "results": "A JSON object with multiple answers.",
                "url_destination": BASE_URL + "saas/soa/answers"
            },
            {
                "endpoint_title": "Find user's answers",
                "endpoint_description": "Find all answers of a single user.",
                "request_type": "POST",
                "parameters": "User email(createdBy) as request parameter.",
                "results": "A JSON object with multiple answers created by the same user.",
                "url_destination": BASE_URL + "saas/soa/answers/usersAnswers",
                "comment": "Requires valid JWT."
            },
            {
                "endpoint_title": "Find single answer",
                "endpoint_description": "Returns information about a specific answer according to answer Id.",
                "request_type": "GET",
                "parameters": "Answer Id as request params.",
                "results": "Single answer information in JSON format.",
                "url_destination": BASE_URL + "saas/soa/answers/:answerId"
            },
            {
                "endpoint_title": "Update answer",
                "endpoint_description": "User has the ability to update answer fields. User can only update answers created by him.",
                "request_type": "PATCH",
                "parameters": "Answer body as request param and Answer Id as URL param.",
                "results": "New answer as stored in database in JSON format.",
                "url_destination": BASE_URL + "saas/soa/answers/:answerId",
                "comment": "Requires valid JWT."
            },
            {
                "endpoint_title": "Delete answer",
                "endpoint_description": "User has the ability to permanently delete his own answer.",
                "request_type": "DELETE",
                "parameters": "Answer Id as URL param.",
                "results": "-",
                "url_destination": BASE_URL + "saas/soa/answers/:questionId",
                "comment": "Requires valid JWT."
            },
        ]
    },
    {
        "service_title": "Analytics Service",
        "service_description": "This service provides the essential functionalities for statistical analysis of information stored in database. The returning results can be user to display specific diagrams according to the data stored in database.",
        "endpoints": [
            {
                "endpoint_title": "Find questions by keyword",
                "endpoint_description": "Returns number of questions found in database under each keyword.",
                "request_type": "GET",
                "parameters": "-",
                "results": "Array of JSON objects in format: \[ { labelTitle: 'label1', questionCounter: '1' }, { labelTitle: 'label2', questionCounter: '2' }, ... \]",
                "url_destination": BASE_URL + "saas/soa/analytics/labelQuestions"
            },
            {
                "endpoint_title": "Find questions by date",
                "endpoint_description": "Returns number of questions found in database under specific date range.",
                "request_type": "POST",
                "parameters": "fromDate, toDate as request params.",
                "results": "Array of JSON objects in format: \[	{ timeCreated: 2021-06-29T00:00:00.000Z, questionCounter: '1' }, { timeCreated: 2021-05-31T00:00:00.000Z, questionCounter: '1' }, ... \]",
                "url_destination": BASE_URL + "saas/soa/analytics/dateQuestions"
            },
            {
                "endpoint_title": "My daily contributions",
                "endpoint_description": "Returns questions and answers posted by specific user under date range.",
                "request_type": "POST",
                "parameters": "fromDate, toDate as request params.",
                "results": "{ questions: \[ { timeCreated: 2021-06-30T00:00:00.000Z, questionsCounter: '1' }, { timeCreated: 2021-06-01T00:00:00.000Z, questionsCounter: '1' }, ...\], answers: [ { timeCreated: 2021-06-30T00:00:00.000Z, answersCounter: '1' }, ... \] }",
                "url_destination": BASE_URL + "saas/soa/analytics/myContr",
                "comment": "Requires valid JWT."
            }
        ]
    },
]
}