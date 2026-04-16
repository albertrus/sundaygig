import React, { useState, useRef } from 'react';
import './MusicianProfile.css';

const DEFAULT_AVATAR = 'https://via.placeholder.com/150?text=Upload+Photo';

function MusicianProfile() {
  const [isEditing, setIsEditing] = useState(true);
  const [profilePic, setProfilePic] = useState(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [pricePerGig, setPricePerGig] = useState('');

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setSkillInput('');
    }
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert('Please enter your name before saving.');
      return;
    }
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="profile-card">
      {/* Profile Picture */}
      <div className="profile-pic-section">
        <img
          src={profilePic || DEFAULT_AVATAR}
          alt="Profile"
          className="profile-pic"
          onClick={() => isEditing && fileInputRef.current.click()}
          title={isEditing ? 'Click to upload photo' : ''}
        />
        {isEditing && (
          <button
            className="upload-btn"
            onClick={() => fileInputRef.current.click()}
            aria-label="Upload profile picture"
          >
            📷 Upload Photo
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          aria-label="Profile picture file input"
        />
      </div>

      {/* Name */}
      <div className="profile-field">
        {isEditing ? (
          <input
            className="profile-input"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-label="Musician name"
          />
        ) : (
          <h1 className="profile-name">{name}</h1>
        )}
      </div>

      {/* Bio */}
      <div className="profile-field">
        {isEditing ? (
          <textarea
            className="profile-textarea"
            placeholder="Tell the world about yourself..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            aria-label="Bio"
            rows={3}
          />
        ) : (
          bio && <p className="profile-bio">{bio}</p>
        )}
      </div>

      {/* Skills */}
      <div className="profile-field">
        <h2 className="section-title">Skills</h2>
        <div className="skills-list">
          {skills.map((skill) => (
            <span key={skill} className="skill-tag">
              {skill}
              {isEditing && (
                <button
                  className="remove-skill-btn"
                  onClick={() => handleRemoveSkill(skill)}
                  aria-label={`Remove skill ${skill}`}
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div>
        {isEditing && (
          <div className="skill-input-row">
            <input
              className="profile-input skill-input"
              type="text"
              placeholder="Add a skill (e.g. Guitar, Vocals)"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              aria-label="Skill input"
            />
            <button className="add-skill-btn" onClick={handleAddSkill}>
              Add
            </button>
          </div>
        )}
      </div>

      {/* Price per Gig */}
      <div className="profile-field">
        <h2 className="section-title">Price per Gig</h2>
        {isEditing ? (
          <div className="price-input-wrapper">
            <span className="currency-symbol">$</span>
            <input
              className="profile-input price-input"
              type="number"
              min="0"
              placeholder="0"
              value={pricePerGig}
              onChange={(e) => setPricePerGig(e.target.value)}
              aria-label="Price per gig"
            />
          </div>
        ) : (
          <p className="profile-price">
            {pricePerGig ? `$${Number(pricePerGig).toLocaleString()} / gig` : 'Not specified'}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="profile-actions">
        {isEditing ? (
          <button className="btn btn-save" onClick={handleSave}>
            Save Profile
          </button>
        ) : (
          <button className="btn btn-edit" onClick={handleEdit}>
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}

export default MusicianProfile;
