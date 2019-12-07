module.exports={
    setProfile:(user)=>{
        const {id,name,institute,year,email} = user;
        const profile ={id,institute,year,email};
        return profile;         
    }
}