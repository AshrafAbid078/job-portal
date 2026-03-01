import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { USERAPI_END_POINT } from "../Utils/constant";
import { setUser } from "../redux/authSlice";

const UpdateProfile = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    fullName: "",
    email: "",
    bio: "",
    skills: "",
  });

  useEffect(() => {
    if (user) {
      setInput({
        fullName: user.fullName || "",
        email: user.email || "",
        bio: user.profile?.bio || "",
        skills: user.profile?.skills?.join(", ") || "",
        designation: user.profile?.designation || "",
      });
    }
  }, [user]);

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullName);
    formData.append("email", input.email);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    formData.append("designation", input.designation);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${USERAPI_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <dialog className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Update Profile</h3>

        <form onSubmit={submitHandler} className="space-y-4">
          <label>
            <span className="font-semibold">Full Name</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={input.fullName}
            onChange={changeHandler}
            placeholder="Full Name"
            className="input input-bordered w-full"
          />
          <label>
            <span className="font-semibold">Designation</span>
          </label>
          <input
            type="text"
            name="designation"
            value={input.designation}
            onChange={changeHandler}
            placeholder="Designation"
            className="input input-bordered w-full"
          />
          <label>
            <span className="font-semibold">Email</span>
          </label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={changeHandler}
            placeholder="Email"
            className="input input-bordered w-full"
          />
          <label>
            <span className="font-semibold">Bio</span>
          </label>
          <textarea
            name="bio"
            value={input.bio}
            onChange={changeHandler}
            placeholder="Bio"
            className="textarea textarea-bordered w-full"
          />
          <label>
            <span className="font-semibold">Skills</span>
          </label>
          <input
            type="text"
            name="skills"
            value={input.skills}
            onChange={changeHandler}
            placeholder="Skills (React, Node, MongoDB)"
            className="input input-bordered w-full"
          />
          <label>
            <span className="font-semibold">Resume</span>
          </label>
          <input
            id="file"
            name="file"
            type="file"
            accept="application/pdf"
            onChange={fileChangeHandler}
            className="file-input file-input-ghost w-full "
          />

          <div className="modal-action">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn bg-orange-500 text-white"
              disabled={loading}
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateProfile;
