import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

const ImcSchema = z.object({
  size: z.number(),
  weight: z.number(),
});

type ImcDefinition = z.infer<typeof ImcSchema>;

const Imc = () => {
  const { register, handleSubmit } = useForm<ImcDefinition>({
    resolver: zodResolver(ImcSchema),
  });
  const [imcScore, setImcScore] = useState<number | null>(null);

  const onSubmit = (values: ImcDefinition) => {
    setImcScore((values.weight / Math.pow(values.size, 2)) * 100);
  };

  return (
    <div className="flex flex-col w-[200px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="border-[1px] w-full border-blacks"
          placeholder="taille cms"
          type="number"
          {...register("size", {
            setValueAs: (v) => (v === undefined ? 0 : Number(v)),
          })}
        />
        <input
          className="border-[1px] mb-2 w-full border-blacks"
          placeholder="poids kgs"
          type="number"
          {...register("weight", {
            setValueAs: (v) => (v === undefined ? 0 : Number(v)),
          })}
        />
        <button className="border-[1px] border-black w-full">Valider</button>
        {imcScore && <span>Votre IMC {imcScore.toFixed(2)}</span>}
      </form>
    </div>
  );
};

export default Imc;
