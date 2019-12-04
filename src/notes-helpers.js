
export const findFolder = (folders=[], folderId) =>
folders.find(folder => folder.id === folderId)

export const findNote = (notes=[], noteId) =>
notes.find(note => note.id === noteId)

export const getNotesForFolder = (notes=[], folder_id) => (
(!folder_id)
  ? notes
  : notes.filter(note => {
    console.log(typeof note.folder_id, typeof folder_id, 'CONSOLE LOG');
    return note.folder_id === folder_id
  })
)

export const countNotesForFolder = (notes=[], folder_id) =>
notes.filter(note => note.folder_id === folder_id).length