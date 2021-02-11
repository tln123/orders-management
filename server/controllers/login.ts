export const handleLogin = (req: any, res: any, employees: any, bcrypt: any) => {

    const { id, password } = req.body;

    if (!employees[id]){
        res.json('wrong-id')
    }else if (!bcrypt.compareSync(password, employees[id].password)){
        res.json('wrong-password');
    } else {
        const employee = { id: id, name: employees[id].name, fulfilledCount: employees[id].fulfilledCount };
        res.status(200).json(employee);
    }
}



