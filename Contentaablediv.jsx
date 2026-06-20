 const handleChange = (e) => {
    const file = Array.from(e.target.files)

    const formatedImages = file.map(file => ({
      id: Date.now(),
      file,
      preview: URL.createObjectURL(file)
    }))
    console.log(formatedImages)
    dispatch(setImages(formatedImages[0]))

  }


//slice
   setImages: (state, action) => {
      state.images = [...state.images, action.payload]
    },
    clearImages: (state) => {
      state.images.forEach((img) => {
        URL.revokeObjectURL(img.preview)
      })

      state.images = []
    },