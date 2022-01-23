import { useState } from "react";
import { useRouter } from "next/router";

const Searchform = () => {
    const router = useRouter();
    const [query, setQuery] = useState("");
  
    function search(e){
      e.preventDefault();
      router.push(`/search?query=${query}`);
    }

    return <form className="flex h-10 ml-auto md:w-auto w-full" onSubmit={search}>
        <input type="text" className="form-input-primary rounded-tl-md rounded-bl-md" placeholder="Search notes" value={query} onChange={e => setQuery(e.target.value)} />

        <button type="submit" className="flex items-center btn-primary btn-blue rounded-tr-md rounded-br-md flex-grow py-auto"><i className="fa fa-search "></i></button>
    </form>;
};

export default Searchform;
