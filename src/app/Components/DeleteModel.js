'use client'

const DeleteModel =({onCancel,onConfirm})=>{
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative mx-4 p-6 w-full max-w-md bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Delete Record</h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Are you sure to delete the record</p>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
    )
}

export default DeleteModel