
const { nanoid } = require("nanoid");
const notes = require("./notes");

//Fungsi Menambahkan Catatan
const addNoteHandler = (request, h) => {

    //Untuk Mendapatkan Data Yang Di Kirim Client
    const {title, tags, body} = request.payload;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    /**Memasukan nilai-nilai tersebut ke dalam array notes menggunakan method push(). */
    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    };
    notes.push(newNote);
    
    /**isSuccess untuk menentukan respons yang diberikan server. 
     * Jika isSuccess bernilai true, maka beri respons berhasil. Jika false, maka beri respons gagal. */
    const isSuccess = notes.filter((note) => note.id === id ).length > 0;

    if(isSuccess){
        const response = h.response({
            status : 'success',
            message : 'Catatan Berhasil Di Tambahkan',
            data : {
                noteId : id,
            }
        });
        response.code (201);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
      });
      response.code(500);
      return response;
    };

    //Fungsi Menampilkan Catatan
    const getAllNoteHandler = () =>({
        status : 'success',
        data : {
            notes,
        },
    })

    const getNoteByIdHandler = (request, h) => {
        const {id} = request.params;
        
        //Mendapatkan objek note dengan id tersebut dari objek array notes. Manfaatkan method array filter() untuk mendapatkan objeknya.
        const note = notes.filter((n) => n.id === id )[0];

        //Memastikan objek note tidak bernilai undefined. Bila undefined, kembalikan dengan respons gagal.
        if(note !== undefined){
            return {
                status : 'success',
                data : {
                    note,
                },
            };
        }

        const response = h.response({
            status : 'failed',
            message :'Gagal  Menampilkan Catatan'
        });
         response.code(404);
         return response;

    };

    //Meng-Edit Catatan
    const editNoteByIdHandler = (request, h) => {
        const { id } = request.params;
       
        const { title, tags, body } = request.payload;
        const updatedAt = new Date().toISOString();
        
        //Untuk mendapatkan index array pada objek catatan sesuai id yang ditentukan.menggunakan findIndex
        const index = notes.findIndex((note) => note.id === id);
        
        /**Bila note dengan id yang dicari ditemukan, 
         * maka index akan bernilai array index dari objek catatan yang dicari
         * . Namun bila tidak ditemukan, maka index bernilai -1 ,Kita Gunakan If-Else Untuk Menentukan Gagal atau Tidaknya permintaan*/
        if (notes.id !== -1 ) {
          notes[index] = {
              // ...notes[index] untuk mengambil data yang tersisa di array notes
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
          };
       
          const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diperbarui',
          });
          response.code(200);
          return response;
        }
       
        const response = h.response({
          status: 'fail',
          message: 'Gagal memperbarui catatan. Id tidak ditemukan',
        });
        response.code(404);
        return response;
      };
    
      //Menghapus Catatan
      const deleteNoteByIdHandler = (request, h) => {
          const { id } = request.params;
        
          //Mendapatkan index dari objek catatan sesuai dengan id yang didapat
          const index = notes.findIndex((note) => note.id === id);

          if (index !== -1){
              //Menghapus Object/Array 
              notes.splice(index, 1)

              const response = h.response({
                  status: 'succes',
                  message: 'Catatan berhasil dihapus' ,
              });
              response.code(200);
              return response;
        };
            const response = h.response({
                status: 'fail',
                message: 'Catatan gagal dihapus',
            });
            response.code(400);
            return response;
      }
       




    module.exports = {
        addNoteHandler, 
        getAllNoteHandler, 
        getNoteByIdHandler, 
        editNoteByIdHandler,
        deleteNoteByIdHandler,
    };