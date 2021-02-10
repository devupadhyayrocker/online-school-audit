export class AppConfig {
    public static commonurl = 'http://13.235.26.250:3000/api/';
    public static Subjects = ["English", "E.V.S.", "Social Studies", "Hindi", "Mathematics", "Computer", "G.K.", "Physics", "Chemistry", "Biology", "Music", "Physical Education", "Geography", "Sanskrit", "Political Science", "History", "Dance", "Art & Craft", "French", "Gurmukhi", "German"];
    public static schools = ["Seth Anandram Jaipuria School, Unnao", "Seth Anandram Jaipuria School, Lucknow (Alambagh Extn)", "Seth Anandram Jaipuria School, Varanasi",
        "Seth Anandram Jaipuria School, Sitarganj", "Seth Anandram Jaipuria School, Satna", "Seth Anandram Jaipuria School, Raebareli", "Seth Anandram Jaipuria School, Mirzapur",
        "Seth Anandram Jaipuria School, Dibiyapur"];
    public static staffType = ["Teaching", "Non-Teaching"];
    public static nonteachingArea = ["Admin", "Accounts", "Admission Counsellor", "Academic Co-ordinator", "Transport", "Maintenance", "Counsellor", "Back Office Executive", "M.E."];
    public static teacherType = ["Scholastic", "Co-Scholastic"];
    public static teacherCategory = ["N.T.", "P.R.T.", "T.G.T.", "P.G.T."];
    public static classTeacher = ["Yes", "No"];
    public static classList = ["Pre-Nursery/Nursery", "L.K.G./Nursery", "U.K.G./Prep", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"];
    public static section = ["A", "B", "C", "D", "E", "F"];
    public static principalFormList = ["Principal Evaluation Teaching", "Principal Evaluation Non Teaching"]
    public static TeachingFormList = ["Self Evaluation", "Peer Evaluation", "Document Evaluation"];
    public static EditorFormList = ["Class Room Observation Scholastic Evaluation Form","Class Room Observation Co-Scholastic Evaluation Form"];
    public static nt_class = ["Pre-Nursery/Nursery", "L.K.G./Nursery", "U.K.G./Prep"];
    public static prt_class = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"];
    public static tgt_class = ["Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"];
    public static pgt_class = ["Class 11", "Class 12"];
    public static nt_sub = ["English", "E.V.S.", "Hindi", "Mathematics", "Music", "Dance/Activity"];
    public static prt_sub = ["English", "E.V.S./Social Studies", "Physical Education", "Hindi", "Mathematics", "Science", "Sanskrit", "G.K.", "Art", "Computer"];
    public static tgt_sub = ["English", "Hindi", "Computer", "Mathematics", "Physics", "Chemistry", "Biology", "Science", "Social Studies", "Geography", "History", "French", "Physical Education", "Library", "German", "Music", "Dance", "Art & Craft", "Sanskrit"];
    public static pgt_sub = ["English", "E.V.S."];
    public static observed_by = ["Tapasi", "Mekhala","Arpita","Sanjay","MARINA CYRIL","Rashmi Minocha","Ms. Kajal","Joan E Nathan","Kabila Rawat","Dr. Pankaj sharma"];
    public static selectStaff = [{
        id: 1,
        name: "Principal"
    }, {
        id: 2,
        name: "Teaching Staff"
    }, {
        id: 3,
        name: "Non Teaching Staff"
    },
    {
        id: 4,
        name: "Editor"
    }]

    public static selectAssessment = [{
        id: 1,
        name: "Self Evaluation"
    }, {
        id: 2,
        name: "Peer Evaluation"
    }, {
        id: 3,
        name: "Principal Evaluation Teaching"
    }, {
        id: 4,
        name: "Principal Evaluation Non Teaching"
    }, {
        id: 5,
        name: "Document Evaluation"
    }, {
        id: 6,
        name: "Class Room Observation Scholastic Evaluation Form"
    }, {
        id: 7,
        name: "Class Room Observation Co-Scholastic Evaluation Form"
    }]

    public static formConfig = [{

        formName: "Teaching Self Evaluation Form",
        totalMarks: 80,
        QuesNo: 20,
        maxMarks: 4,
        for: ["teaching"],
        values: [1, 2, 3, 4],
        key: 1,
        matrixValue: "21"
    },
    {

        formName: "Teaching Peer Evaluation Form",
        totalMarks: 40,
        QuesNo: 10,
        maxMarks: 4,
        for: ["teaching"],
        values: [1, 2, 3, 4],
        key: 2,
        matrixValue: "22"
    },
    {

        formName: "Teaching Document Evaluation Form",
        totalMarks: 60,
        QuesNo: 30,
        maxMarks: 2,
        for: ["teaching"],
        values: [1, 2, -1],
        key: 3,
        matrixValue: "25"
    },
    {

        formName: "Non Teaching Self Evaluation Form",
        totalMarks: 104,
        QuesNo: 26,
        maxMarks: 4,
        for: ["nonteaching"],
        values: [1, 2, 3, 4],
        key: 4,
        matrixValue: "31"
    },
    {

        formName: "Non Teaching Peer Evaluation Form",
        totalMarks: 48,
        QuesNo: 12,
        maxMarks: 4,
        for: ["nonteaching"],
        values: [1, 2, 3, 4],
        key: 5,
        matrixValue: "32"
    },
    {

        formName: "Principal Teaching Evaluation Form",
        totalMarks: 80,
        QuesNo: 20,
        maxMarks: 4,
        for: ["principal"],
        values: [1, 2, 3, 4],
        key: 6,
        matrixValue: "13"
    },
    {

        formName: "Principal Non Teaching Evaluation Form",
        totalMarks: 108,
        QuesNo: 27,
        maxMarks: 4,
        for: ["principal"],
        values: [1, 2, 3, 4],
        key: 7,
        matrixValue: "14"
    },
    {

        formName: "Class Room Observation Scholastic Evaluation Form",
        totalMarks: 75,
        QuesNo: 15,
        maxMarks: 5,
        for: ["editor"],
        values: [1, 2, 3, 4, 5],
        key: 8,
        matrixValue: "46"
    },
    {

        formName: "Class Room Observation Co-Scholastic Evaluation Form",
        totalMarks: 80,
        QuesNo: 16,
        maxMarks: 5,
        for: ["editor"],
        values: [1, 2, 3, 4, 5],
        key: 9,
        matrixValue: "47"
    }];



}
