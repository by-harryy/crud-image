import CreateForm from "@/components/create-form";

const createPage = () => {
    return (
        <div className="min-h-screen items-center flex justify-center bg-sky-300">
            <div className="rounded-lg bg-white p-8 shadow">
                <h2 className="text-2xl font-bold mb-5">Upload Image Yuk!</h2>
                <CreateForm />
            </div>
        </div>
    )
}

export default createPage;