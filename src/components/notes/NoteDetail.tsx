import { deleteNote } from "@/api/NoteAPI"
import { useAuth } from "@/hooks/useAuth"
import type { Note } from "@/types/index"
import { formatDate } from "@/utils/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { Puff } from "react-loader-spinner"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"

type NoteDetailProps = {
    note: Note
}

export default function NoteDetail({note} : NoteDetailProps) {

    const { data, isLoading } = useAuth()
    const canDelete = useMemo(()=> data?._id === note.createdBy._id, [data])
    const params = useParams()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    const projectId = params.projectId!
    const taskId = queryParams.get('viewTask')!

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: (error)=> {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['task', taskId]})
        }
    })

    if (isLoading) {
        return (
        <div className="flex flex-col justify-center items-center h-screen space-y-5">
            <Puff
            height={70}
            width={70}
            color="#a855f7"
            ariaLabel="puff-loading"
            />
            <p className="text-gray-500 text-xl font-semibold animate-pulse">
                Cargando notas...
            </p>
        </div>
        );
    }
    return (
        <div className="p-3 flex justify-between items-center">
            <div>
                <p>
                    {note.content}
                </p>
                <p className="text-xs text-slate-600">
                    Creada por: <span className="font-bold">{note.createdBy.name}</span> {formatDate(note.createdAt)}
                </p>
            </div>
            {canDelete && (
                <button type="button" className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transition-colors rounded-lg" onClick={()=> mutate({projectId, taskId, noteId: note._id})}>Eliminar</button>
                
            )}


        </div>
    )
}
