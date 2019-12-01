
export const findFolder = (folders=[], folderId) =>
folders.find(folder => folder.id === folderId)

export const findNote = (notes=[], noteId) =>
notes.find(note => note.id === noteId)

export const getNotesForFolder = (notes=[], folderId) => (
(!folderId)
  ? notes
  : notes.filter(note => note.folder_id === folderId)
)

export const countNotesForFolder = (notes=[], folder_id) =>
notes.filter(note => note.folder_id === folder_id).length