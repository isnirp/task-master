class User:
    def __init__(self, id, firstName, lastName, dob, role, email):
        self.id = id
        self.firstName = firstName
        self.lastName = lastName
        self.dob = dob
        self.role = role
        self.email = email
        
    def getName(self):
        return self.firstName + " "+ self.lastName
    
    def setName(self, firstName, lastName):
        self.firstName = firstName
        self.lastName = lastName

    def __repr__(self):
        return f"User(id={self.id}, name={self.firstName} {self.lastName}, role={self.role}, email={self.email})"
    
    


if __name__ == "__main__":
    # create an object or an instance of a class
    var_employee1 = User(id=1, firstName="Prince", lastName="last", dob="01/05/2026", role="teacher",email="email@email.com")
    print(var_employee1.getName())
    
    var_employee1.setName(firstName="Esi", lastName="Nam")
    print(var_employee1.getName())
    
    """ var_employee2 = User(id=2, firstName="Mariam", lastName="Zoe", dob="01/05/2026", role="student",email="java@email.com")
    print(var_employee2.getName())
    
    var_employee3 = User(id=2, firstName="Aida", lastName="Zoe", dob="01/05/2026", role="student",email="java@email.com")
    print(var_employee3.getName()) """
    