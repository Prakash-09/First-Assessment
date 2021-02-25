module.exports.GET_CONCEPT_CARDS_DATA = [
    {
        id: "concept1",
        key: "concept-card-one",
        type: "Concept",
        qst: "What is Mixed Reality?",  //title instead of qst
        //description:
        //multimedia: [image, video, none]
        //background: 
        //date: ex- 30Jun21
        //fav: boolean
    },
    {
        id: "concept2",
        key: "concept-card-two",
        type: "Concept",
        qst: "What is Mixed Reality?",
    },
]
module.exports.CONCEPT_CONFIG_FIELDS = [
    {
        id: "configfield1",
        key: "type",
        label: "Type",
        type: "text",
    },
    {
        id: "configfield2",
        key: "qst",
        label: "Question on the card",
        type: "text",
    },
]

module.exports.GET_THREE_SIMILAR_SECTIONS_CARDS_DATA = {
    "Open Source" : [
        {
            id: "open1",
            key: "open-card-one",
            type: "Open Source",
            description: "OpenXR API",
        },
        {
            id: "open2",
            key: "open-card-two",
            type: "Open Source",
            description: "OpenXR API",
        },
    ],
    "Companies" : [
        {
            id: "company1",
            key: "company-card-one",
            type: "Companies",
            description: "CompanyXR API",
        },
        {
            id: "company2",
            key: "company-card-two",
            type: "Companies",
            description: "CompanyXR API",
        },
    ],
    "Influencers" : [
        {
            id: "influencer1",
            key: "influencer-card-one",
            type: "Influencers",
            description: "InfluencerXR API",
        },
        {
            id: "influencer2",
            key: "influencer-card-two",
            type: "Influencers",
            description: "InfluencerXR API",
        },
    ]
}

module.exports.THREE_SIMILAR_SECTIONS_CONFIG_FIELDS = [
    {
        id: "similarSelectionConfigField1",
        key: "description",
        label: "Description on the card",
        type: "text",
    },
]