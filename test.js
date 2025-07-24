// import { exit } from "process";

// const data = [
//     {
//         "classId": "685fbe1bf89499f7bb6ccb6b",
//         "subjectName": "Math",
//         "attendance": [
//             {
//                 "studentId": "68708f275d3381678c69a971",
//                 "status": "present"
//             },
//             {
//                 "studentId": "6874ba839113c2e423738e58",
//                 "status": "absent"
//             },
//             {
//                 "studentId": "6874bb409113c2e423738eeb",
//                 "status": "present"
//             },
//             {
//                 "studentId": "6874bba79113c2e423738f6f",
//                 "status": "present"
//             },
//             {
//                 "studentId": "687a6cc3e052d0ed2719cf8e",
//                 "status": "absent"
//             },
//             {
//                 "studentId": "687f3725d0ee71c1b5d1e895",
//                 "status": "present"
//             },
//             {
//                 "studentId": "6880c010d19bf95600f636e6",
//                 "status": "absent"
//             },
//             {
//                 "studentId": "6880c027d19bf95600f6370d",
//                 "status": "absent"
//             },
//             {
//                 "studentId": "6880c038d19bf95600f63735",
//                 "status": "present"
//             }
//         ],
//         "type": "sub",
//         "teacherId": "687467417330e493b71bc975",
//         "submittedAt": "2025-07-23T14:55:35.806Z",
//         "retryCount": 0
//     },
//     {
//         "classId": "685fbe1bf89499f7bb6ccb6b",
//         "subjectName": "Math",
//         "attendance": [
//             {
//                 "studentId": "6874bb409113c2e423738eeb",
//                 "status": "present"
//             },
//             {
//                 "studentId": "68708f275d3381678c69a971",
//                 "status": "present"
//             },
//             {
//                 "studentId": "6874ba839113c2e423738e58",
//                 "status": "absent"
//             },
//             {
//                 "studentId": "6874bba79113c2e423738f6f",
//                 "status": "present"
//             },
//             {
//                 "studentId": "687a6cc3e052d0ed2719cf8e",
//                 "status": "present"
//             },
//             {
//                 "studentId": "687f3725d0ee71c1b5d1e895",
//                 "status": "absent"
//             },
//             {
//                 "studentId": "6880c010d19bf95600f636e6",
//                 "status": "absent"
//             },
//             {
//                 "studentId": "6880c027d19bf95600f6370d",
//                 "status": "present"
//             },
//             {
//                 "studentId": "6880c038d19bf95600f63735",
//                 "status": "absent"
//             }
//         ],
//         "type": "sub",
//         "teacherId": "687467417330e493b71bc975",
//         "submittedAt": "2025-07-23T14:59:46.389Z",
//         "retryCount": 0
//     },
//     {
//         "classId": "685fbe1bf89499f7bb6ccb6b",
//         "subjectName": "Math",
//         "attendance": [
//             {
//                 "studentId": "68708f275d3381678c69a971",
//                 "status": "present"
//             },
//             {
//                 "studentId": "6874ba839113c2e423738e58",
//                 "status": "present"
//             },
//             {
//                 "studentId": "6874bba79113c2e423738f6f",
//                 "status": "present"
//             },
//             {
//                 "studentId": "6874bb409113c2e423738eeb",
//                 "status": "absent"
//             },
//             {
//                 "studentId": "687a6cc3e052d0ed2719cf8e",
//                 "status": "absent"
//             },
//             {
//                 "studentId": "687f3725d0ee71c1b5d1e895",
//                 "status": "absent"
//             },
//             {
//                 "studentId": "6880c010d19bf95600f636e6",
//                 "status": "absent"
//             },
//             {
//                 "studentId": "6880c027d19bf95600f6370d",
//                 "status": "present"
//             },
//             {
//                 "studentId": "6880c038d19bf95600f63735",
//                 "status": "absent"
//             }
//         ],
//         "type": "sub",
//         "teacherId": "687467417330e493b71bc975",
//         "submittedAt": "2025-07-23T15:05:03.874Z",
//         "retryCount": 0
//     }
// ]


// // console.log(data[0]);

// const studentId_find ="6880c010d19bf95600f636e6"
// let count = 0;
// data.map((student,idx) => {
//     student.attendance.map((att,idx2) => {
//         // count++;
//         if(att.studentId == studentId_find) {
//             console.log(`Found at index: ${idx2} in data[${idx}].attendance`);
//             exit(0);
//         }
//         // if()
//     })
// })


//give me random 0 and 1 in an array
// const att = [1, 1, 0, 1, 0,1,0,1,0]
// const att = [1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1]
// let streaknum = 0
// let allstreaks = []
// let maxStreak = 0
// function ok() {
//     let count = 0
//     for (const attend of att) {
//         count++
//         if (attend == 1) {
//             streaknum++
//             if (count == att.length) {
//                 allstreaks.push(streaknum)
//                 streaknum = 0
//             }
//         }
//         else if (attend == 0) {
//             allstreaks.push(streaknum)
//             streaknum = 0
//         }
//     }
//     for (const streaks of allstreaks) {
//         if (maxStreak < streaks) {
//             maxStreak = streaks
//         }
//     }
//     console.log(maxStreak)
// }
// ok()

const att = [1, 0, 1, 1,1,1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1]; //example array of each subject attendance
let maxStreak = 0;
let currentStreak = 0;

for (const attend of att) {
    if (attend === 1) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
    } else {
        currentStreak = 0;
    }
}
console.log(maxStreak);