import { useEffect, useMemo, useState } from "react";
import { CollectorForm } from "../components/CollectorForm";
import { CollectorList } from "../components/CollectorList";
import { MatchList } from "../components/MatchList";
import { StickerGrid } from "../components/StickerGrid";
import { collectorService } from "../services/collectorService";
import { stickerService } from "../services/stickerService";
import { Collector, CollectorPayload } from "../types/collector";
import { Sticker, TradeMatch } from "../types/sticker";

export function Home() {
  const [collectors, setCollectors] = useState<Collector[]>([]);
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [wantedStickers, setWantedStickers] = useState<Sticker[]>([]);
  const [duplicateStickers, setDuplicateStickers] = useState<Sticker[]>([]);
  const [matches, setMatches] = useState<TradeMatch[]>([]);
  const [selectedCollector, setSelectedCollector] = useState<Collector | null>(null);
  const [editingCollector, setEditingCollector] = useState<Collector | null>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const wantedCodes = useMemo(() => wantedStickers.map((sticker) => sticker.code), [wantedStickers]);
  const duplicateCodes = useMemo(() => duplicateStickers.map((sticker) => sticker.code), [duplicateStickers]);

  useEffect(() => {
    void loadInitialData();
  }, []);

  useEffect(() => {
    if (selectedCollector) {
      void loadCollectorLists(selectedCollector.id);
    } else {
      setWantedStickers([]);
      setDuplicateStickers([]);
    }
  }, [selectedCollector]);

  async function loadInitialData() {
    try {
      setIsLoading(true);
      const [collectorList, stickerList, matchList] = await Promise.all([
        collectorService.list(),
        stickerService.listCatalog(),
        stickerService.listMatches()
      ]);
      setCollectors(collectorList);
      setStickers(stickerList);
      setMatches(matchList);
      setSelectedCollector(collectorList[0] ?? null);
    } catch (error) {
      showError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function loadCollectorLists(collectorId: string) {
    try {
      const [wanted, duplicates, matchList] = await Promise.all([
        stickerService.listWanted(collectorId),
        stickerService.listDuplicates(collectorId),
        stickerService.listMatches()
      ]);
      setWantedStickers(wanted);
      setDuplicateStickers(duplicates);
      setMatches(matchList);
    } catch (error) {
      showError(error);
    }
  }

  async function handleSubmitCollector(payload: CollectorPayload) {
    try {
      if (editingCollector) {
        const updatedCollector = await collectorService.update(editingCollector.id, payload);
        setCollectors((currentCollectors) =>
          currentCollectors.map((collector) => (collector.id === updatedCollector.id ? updatedCollector : collector))
        );
        setSelectedCollector(updatedCollector);
        setEditingCollector(null);
        setMessage("Colecionador atualizado com sucesso.");
        return;
      }

      const createdCollector = await collectorService.create(payload);
      setCollectors((currentCollectors) => [createdCollector, ...currentCollectors]);
      setSelectedCollector(createdCollector);
      setMessage("Colecionador criado com sucesso.");
    } catch (error) {
      showError(error);
    }
  }

  async function handleRemoveCollector(collector: Collector) {
    const confirmed = window.confirm(`Remover o colecionador ${collector.name}?`);

    if (!confirmed) {
      return;
    }

    try {
      await collectorService.remove(collector.id);
      const nextCollectors = collectors.filter((currentCollector) => currentCollector.id !== collector.id);
      setCollectors(nextCollectors);
      setSelectedCollector(nextCollectors[0] ?? null);
      setMessage("Colecionador removido com sucesso.");
      await loadInitialData();
    } catch (error) {
      showError(error);
    }
  }

  async function handleAddWanted(sticker: Sticker) {
    if (!selectedCollector) {
      setMessage("Selecione um colecionador antes de marcar figurinhas.");
      return;
    }

    try {
      await stickerService.addWanted(selectedCollector.id, sticker.code);
      await loadCollectorLists(selectedCollector.id);
      setMessage("Figurinha adicionada às desejadas.");
    } catch (error) {
      showError(error);
    }
  }

  async function handleAddDuplicate(sticker: Sticker) {
    if (!selectedCollector) {
      setMessage("Selecione um colecionador antes de marcar figurinhas.");
      return;
    }

    try {
      await stickerService.addDuplicate(selectedCollector.id, sticker.code);
      await loadCollectorLists(selectedCollector.id);
      setMessage("Figurinha adicionada às repetidas para troca.");
    } catch (error) {
      showError(error);
    }
  }

  async function handleRemoveWanted(sticker: Sticker) {
    if (!selectedCollector) {
      return;
    }

    try {
      await stickerService.removeWanted(selectedCollector.id, sticker.code);
      await loadCollectorLists(selectedCollector.id);
      setMessage("Figurinha removida das desejadas.");
    } catch (error) {
      showError(error);
    }
  }

  async function handleRemoveDuplicate(sticker: Sticker) {
    if (!selectedCollector) {
      return;
    }

    try {
      await stickerService.removeDuplicate(selectedCollector.id, sticker.code);
      await loadCollectorLists(selectedCollector.id);
      setMessage("Figurinha removida das repetidas.");
    } catch (error) {
      showError(error);
    }
  }

  function showError(error: unknown) {
    setMessage(error instanceof Error ? error.message : "Ocorreu um erro inesperado.");
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p>Trocas online de figurinhas</p>
          <h1>CopaTrade</h1>
        </div>
        <span className="status">{isLoading ? "Carregando" : "Online"}</span>
      </header>

      {message && <div className="feedback">{message}</div>}

      <main className="dashboard">
        <aside className="sidebar">
          <CollectorForm
            editingCollector={editingCollector}
            onSubmit={handleSubmitCollector}
            onCancelEdit={() => setEditingCollector(null)}
          />
          <CollectorList
            collectors={collectors}
            selectedCollectorId={selectedCollector?.id ?? null}
            onSelect={setSelectedCollector}
            onEdit={setEditingCollector}
            onRemove={handleRemoveCollector}
          />
        </aside>

        <section className="content">
          <div className="selected-collector">
            <span>Colecionador selecionado</span>
            <strong>
              {selectedCollector
                ? `${selectedCollector.name} - ${selectedCollector.city || selectedCollector.email}`
                : "Nenhum colecionador selecionado"}
            </strong>
          </div>

          <StickerGrid
            title="Álbum da Copa"
            stickers={stickers}
            emptyMessage="Nenhuma figurinha cadastrada no álbum."
            primaryActionLabel="Quero"
            secondaryActionLabel="Tenho repetida"
            disabled={!selectedCollector}
            markedPrimaryCodes={wantedCodes}
            markedSecondaryCodes={duplicateCodes}
            onPrimaryAction={handleAddWanted}
            onSecondaryAction={handleAddDuplicate}
          />

          <div className="collection-columns">
            <StickerGrid
              title="Desejadas"
              stickers={wantedStickers}
              emptyMessage="Este colecionador ainda não marcou figurinhas desejadas."
              primaryActionLabel="Remover"
              onPrimaryAction={handleRemoveWanted}
            />
            <StickerGrid
              title="Repetidas para troca"
              stickers={duplicateStickers}
              emptyMessage="Este colecionador ainda não marcou figurinhas repetidas."
              primaryActionLabel="Remover"
              onPrimaryAction={handleRemoveDuplicate}
            />
          </div>

          <MatchList matches={matches} />
        </section>
      </main>

      <footer>Equipe CopaTrade - Atividade Prática de DevOps</footer>
    </div>
  );
}
