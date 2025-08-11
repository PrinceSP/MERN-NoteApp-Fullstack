import User from "../models/user.js"

export async function getAllUser(_, res) {
  try {
    const users = await User.find().select("-password")
    if (!users) return res.status(404).json({ message: "User table is empty!" })

    return res.status(200).json(users)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal Server Error" })
  }
}

export async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).json({message:"User is not found!"})

    return res.status(200).json(user)
  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Internal Server Error"})
  }
}

export async function createUser(req, res) {
  const {username,email,password} = req.body
  try {
    const user = new User({ username, email, password })
    await user.save()

    return res.status(200).json({message:"Success create new user!"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal Server Error" })
  }
}

export async function updateUserById(req, res) {
  const { username, email, password } = req.body
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { username, email, password })
    if (!user) return res.status(404).json({ message: "User is not found!" })

    return res.status(201).json({ message: "Success update user" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal Server Error" })
  }
}

export async function deleteUserById(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).json({ message: "User is not found!" })

    return res.status(200).json({ message: "Success delete user" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal Server Error" })
  }
}