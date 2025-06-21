import React, { useState, useRef, useEffect } from 'react';

const FolderSelectDropdown = ({ folders, selectedFolder, setSelectedFolder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState(new Set());
  const dropdownRef = useRef();

  const toggleFolder = (id) => {
    const updated = new Set(expandedFolders);
    updated.has(id) ? updated.delete(id) : updated.add(id);
    setExpandedFolders(updated);
  };

  const handleSelect = (folder) => {
    setSelectedFolder(folder);
    setIsOpen(false);
  };

  const renderFolders = (folders, level = 0) =>
    folders.map((folder) => {
      const isExpanded = expandedFolders.has(folder._id);
      const hasSubfolders = folder.subfolders && folder.subfolders.length > 0;

      return (
        <div key={folder._id} style={{ marginLeft: `${level * 20}px` }}>
          <div
            className="flex items-center py-1 px-2 hover:bg-gray-100 cursor-pointer text-[13px]"
            onClick={() => handleSelect(folder)}
          >
            {hasSubfolders && (
              <span
                className="mr-1 text-gray "
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFolder(folder._id);
                }}
              >
                {isExpanded ? '▾' : '▸'}
              </span>
            )}
            {!hasSubfolders && <span className="mr-4" />}
            <span>{folder.name || 'Unnamed Folder'}</span>
          </div>

          {isExpanded && hasSubfolders && (
            <div>{renderFolders(folder.subfolders, level + 1)}</div>
          )}
        </div>
      );
    });

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Selected Box */}
      <div
        className="border border-gray-300 rounded px-3 py-2 cursor-pointer text-sm bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedFolder?.name || '-- Select Folder --'}
      </div>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute z-10 bg-white border border-gray-300 rounded mt-1 w-full max-h-64 overflow-y-auto shadow-lg">
          {renderFolders(folders)}
        </div>
      )}
    </div>
  );
};

export default FolderSelectDropdown;
