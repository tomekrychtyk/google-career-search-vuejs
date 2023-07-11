interface PersonNameInterface {
  name: string
}
interface Person1 extends PersonNameInterface {
  age: number
}

type PersonNameType = {
  name: string
}
interface Person2 extends PersonNameType {
  age: number
}

class PersonClass {
  height = 100
}

type PersonNameType2 = {} & PersonClass
