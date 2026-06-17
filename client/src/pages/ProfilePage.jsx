import { useState, useEffect } from 'react'
import assets from '../assets/assets'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Helper function to compress and resize images on client-side before upload
const compressImage = (file, maxWidth = 300, maxHeight = 300, quality = 0.75) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

const ProfilePage = () => {
  const {authUser, updateProfile} = useAuth()
  const [selectedImg, setSelectedImg] = useState(null)
  const [name, setName] = useState(authUser?.fullName || "")
  const [bio, setBio] = useState(authUser?.bio || "")
  const [isUpdating, setIsUpdating] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      setName(authUser.fullName || "");
      setBio(authUser.bio || "");
    }
  }, [authUser]);

  const handleSubmit = async (e)=>{
    console.log("Submit clicked");
    e.preventDefault();
    setIsUpdating(true);

    try {
      let profilePicBase64 = null;
      if (selectedImg) {
        console.log("selectedImg present, compressing...");
        profilePicBase64 = await compressImage(selectedImg);
        console.log("Image compressed successfully, base64 length:", profilePicBase64?.length);
      }

      const profileData = {
        fullName: name,
        bio,
        ...(profilePicBase64 && { profilePic: profilePicBase64 })
      };

      console.log("Calling updateProfile with:", { ...profileData, profilePic: profilePicBase64 ? "base64..." : undefined });
      const success = await updateProfile(profileData);
      console.log("updateProfile result:", success);

      if (success) {
        toast.success("Profile updated successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.message || "Failed to process image");
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
       <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1 max-w-[360px]" style={{ padding: '40px' }}>
        <h3 className="text-lg">Profile details</h3>
        <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
          <input onChange={(e)=>setSelectedImg(e.target.files[0])} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden disabled={isUpdating}/>
          <img src={selectedImg ? URL.createObjectURL(selectedImg) : authUser?.profilePic || assets.profile_martin} alt="" className='w-12 h-12 rounded-full object-cover'/>
          upload profile image
        </label>
        <input 
          onChange={(e)=>setName(e.target.value)} 
          value={name}
          type="text" 
          required 
          placeholder='Your name' 
          className='p-2 bg-transparent text-white border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500'
          style={{ paddingLeft: '10px', paddingRight: '10px' }}
          disabled={isUpdating}
        />
        <textarea 
          onChange={(e)=>setBio(e.target.value)} 
          value={bio} 
          placeholder="Write profile bio" 
          required 
          className="p-2 bg-transparent text-white border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none" 
          rows={4}
          style={{ paddingLeft: '10px', paddingRight: '10px', paddingTop: '8px', paddingBottom: '8px' }}
          disabled={isUpdating}
        ></textarea>
        <button 
          type="submit" 
          disabled={isUpdating}
          className="w-full bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUpdating ? "Saving..." : "Save"}
        </button>
       </form>
       <img className={`w-56 aspect-square rounded-full max-sm:mt-10`} src={authUser?.profilePic || assets.logo_icon} alt="" style={{ marginLeft: '40px', marginRight: '40px' }} />
      </div>
    </div>
  )
}

export default ProfilePage