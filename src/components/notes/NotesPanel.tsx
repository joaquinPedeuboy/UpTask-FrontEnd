import type { Task } from "@/types/index";
import AddNoteForm from "./AddNoteForm";
import NoteDetail from "./NoteDetail";

type NotePanelProps = {
    notes: Task['notes']
}
export default function NotesPanel({notes} : NotePanelProps) {
    return (
        <>
            <AddNoteForm />

            {notes.length ? (
                <>
                    <p className="font-bold text-2xl text-slate-600 mt-10">Notas:</p>

                    <div className="divide-y divide-gray-300 mt-5">
                        {notes.map(note => (
                            <NoteDetail key={note._id} note={note} />
                        ))}
                    </div>
                </>
            ) : (
                <p className="text-gray-500 text-center pt-3">No hay notas</p>
            )}
        </>
    )
}
