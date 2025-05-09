"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import UpdateProfile from "./UpdateProfile";

const ProfileInfo = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFileName(event.target.files[0].name);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-5">
      <div className="col-span-1 bg-white flex flex-col items-center p-4 rounded-md shadow-[0px_4px_15px_rgba(255,69,58,0.15)]">
        <Image
          className="rounded-full"
          width={140}
          height={140}
          alt="User Avatar"
          src="https://themesbrand.com/velzon/html/creative/assets/images/users/avatar-1.jpg"
        />
        <h1 className="font-semibold text-2xl  py-2">User Name</h1>
        <h3 className="text-gray-500">User Email</h3>
        <p className="text-sm text-gray-400">User Role</p>
        {selectedFileName && (
          <p className="text-sm text-gray-500 mt-2">{selectedFileName}</p>
        )}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          onClick={handleUploadClick}
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Upload New Profile
        </button>
      </div>
      <div className="col-span-3 bg-white p-4 rounded-md shadow-[0px_4px_15px_rgba(255,69,58,0.15)]">
        <UpdateProfile></UpdateProfile>
      </div>
    </div>
  );
};

export default ProfileInfo;
