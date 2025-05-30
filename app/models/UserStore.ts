import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"

// Define the User model 
const User = types.model("User", {
  id: types.identifierNumber,
  date: types.string,
  location: types.string,
  user: types.model("UserDetails", {
    name: types.string,
    lastname: types.string,
    age: types.number,
    fee: types.number,
  }),
})

// Define the UserStore model 
export const UserStoreModel = types
  .model("UserStore")
  .props({
    users: types.array(User),
    isLoading: types.boolean,
    error: types.maybeNull(types.string),
  })
  .actions((self) => ({
    setUsers(users: Array<typeof User.Type>) {
      self.users.replace(users)
    },
    setLoading(loading: boolean) {
      self.isLoading = loading
    },
    setError(message: string | null) {
      self.error = message
    },
  }))
  .actions((self) => ({
    fetchUsers: flow(function* fetchUsers() {
      self.setLoading(true)
      self.setError(null)
      try {
        // Update the current ip address here
        const response = yield fetch("http://192.168.1.196:3000/")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = yield response.json()
        const filteredData = data.filter((item: any) => item.user.age >= 0)
        self.setUsers(filteredData)
      } catch (e: any) {
        self.setError(e.message)
      } finally {
        self.setLoading(false)
      }
    }),
  }))

export interface UserStore extends Instance<typeof UserStoreModel> {}
export interface UserStoreSnapshot extends SnapshotOut<typeof UserStoreModel> {}

// THIS IS THE FUNCTION TO ENSURE IT'S EXPORTED AND USED
export const createUserStoreDefault = () =>
  UserStoreModel.create({
    users: [],
    isLoading: false,
    error: null,
  })
