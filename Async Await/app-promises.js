const users = [{
  id:1,
  name:'Gaurav',
  schoolId:101
},{
  id:2,
  name:'Anjali',
  schoolId:999
}];

const grades = [{
  id:1,
  schoolId:101,
  grade:86
},{
  id:2,
  schoolId:999,
  grade:100
},{
  id:3,
  schoolId:101,
  grade:80
}];

const getUser = (id) => {
  return new Promise((resolve,reject) => {
    const user = users.find((user) => user.id === id);
    if(user){
      resolve(user);
    }else{
      reject(`unable to find user with of ${id}`);
    }
  });
}

const getGrades = (schoolId) => {
  return new Promise((resolve,reject) => {
    resolve(grades.filter((grade) => grade.schoolId === schoolId))
  });
}

// /Andrew has a 83% in the class
const getStatus = (userId) => {
  let user;
  return getUser(userId).then((tempuser) => {
    user = tempuser;
    return getGrades(user.schoolId);
  }).then((grades) => {
    let average = 0;
    if(grades.length > 0){
     average = grades.map((grade) => grade.grade).reduce((a,b) => a+b) / grades.length;
    }

    return `${user.name} has a ${average}% in the class`;
  });
};

//async await
// () => {
//   return new Promise((resolve,reject)=>{
//     resolve('Mike')
//   });
// }

//async return always promises
//whenever throwing an Error from async function thats simply means we are rejecting promise

const getStatusAlt = async (userId) => {
  // throw new Error('This is an Error');
  // return Promise.reject('Error');

  //    const user = getUser(userId);
  // => Promise { { id: 2, name: 'Anjali', schoolId: 999 } }

  // const user = await getUser(userId);
  // => { id: 2, name: 'Anjali', schoolId: 999 }

  const user = await getUser(userId);
  const grades = await getGrades(user.schoolId);
  let average = 0;

  if(grades.length > 0){
   average = grades.map((grade) => grade.grade).reduce((a,b) => a+b) / grades.length;
  }

  return `${user.name} has a ${average}% in the class`;
};

// console.log(getStatusAlt());
getStatusAlt(1).then((status) => {
  console.log(status);
}).catch(console.log);

// getStatus(1).then(status => console.log(status)).catch(e => console.log(e));
