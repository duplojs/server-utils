---
description: "Comprendre le système de commandes et créer une CLI typée avec @duplojs/server-utils."
prev:
  text: "Bien démarrer"
  link: "/fr/v0/guide/quickStart"
next:
  text: "Référence Command"
  link: "/fr/v0/api/command/"
---

# Créer une commande

La feature `command` sert à écrire des CLI qui restent simples à appeler et solides à maintenir. Vous décrivez ce que la commande accepte, la librairie lit les arguments du process, valide les entrées, génère le help et appelle votre handler avec des valeurs déjà typées.

## Principe

Une commande est composée de trois éléments:

- des options, comme `--port 3000` ou `--verbose`;
- des sujets, c'est-à-dire soit des arguments positionnels après les options, soit des sous-commandes;
- un handler, appelé uniquement quand le parsing est valide.

Les options et les arguments s'appuient sur les `DataParser` de `@duplojs/utils`. C'est ce qui permet de transformer une entrée CLI, toujours textuelle au départ, en valeur métier typée.

## Une première commande

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/guide/command/firstCommand.ts-->
```

Ici, `exec` crée la commande racine. La liste `subjects` déclare deux arguments positionnels (`pattern` et `filePath`), puis les valeurs parsées sont exposées dans `args.pattern` et `args.filePath`.

<TerminalBlock title="grep-like">
<span class="terminal-line terminal-info">$ grep-like "TODO" ./src/index.ts --ignore-case</span>
search "TODO" in ./src/index.ts (case-insensitive)
</TerminalBlock>

## Ajouter des options

`createBooleanOption` crée un drapeau. Il vaut `true` si l'option est présente, `false` sinon.

`createOption` parse une valeur unique. Avec `required: true`, le handler reçoit toujours une valeur.

`createArrayOption` parse une liste de valeurs et peut imposer un minimum, un maximum ou un séparateur.

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/guide/command/options.ts-->
```

Le type de `options.type` devient `"file" | "directory"`. Si la valeur reçue ne correspond pas au parser, la commande n'appelle pas le handler.

## Comprendre les erreurs

Quand le parsing échoue, `exec` affiche une erreur interprétée puis sort avec le code `1`. L'erreur indique le chemin de commande, l'option/l'argument fautif, la valeur reçue et ce qui était attendu.

<TerminalBlock title="find-like">
<span class="terminal-line terminal-info">$ find-like --type socket</span>
<span class="terminal-line"></span>
<span class="terminal-line terminal-error">Command failed</span>
<span class="terminal-line terminal-indent-1"><span class="terminal-key">COMMAND:</span> root</span>
<span class="terminal-line terminal-indent-1"><span class="terminal-key">OPTION:</span> --type</span>
<span class="terminal-line"><span class="terminal-error">✖</span> expected <span class="terminal-value">file | directory</span> but received <span class="terminal-error">"socket"</span></span>
</TerminalBlock>


Ce comportement est utile pour les outils internes: vous pouvez garder des contrats stricts sans écrire vous-même les messages de diagnostic.

## Sous-commandes

Pour une CLI avec plusieurs actions, créez des commandes avec `SC.create`, puis passez-les comme `subjects` d'une commande parente.

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/guide/command/subCommands.ts-->
```

<TerminalBlock title="apt-like">
<span class="terminal-line terminal-info">$ apt-like install typescript --yes</span>
install typescript without prompt
</TerminalBlock>

Chaque sous-commande peut avoir sa propre description, ses options, ses arguments de sujet et son handler. Le help suit l'arbre de commandes.

## Help généré

`--help` et `-h` sont automatiquement disponibles. Le rendu est construit depuis les descriptions, les alias, les options et les sujets déclarés.

<TerminalBlock title="apt-like">
<span class="terminal-line terminal-info">$ apt-like --help</span>
<span class="terminal-line"></span>
<span class="terminal-line"><span class="terminal-key">COMMAND:</span> root</span>
<span class="terminal-line terminal-indent-1"><span class="terminal-key">DESCRIPTION:</span></span>
<span class="terminal-line terminal-indent-1">Package manager</span>
<span class="terminal-line terminal-indent-1"><span class="terminal-key">COMMAND:</span> install</span>
<span class="terminal-line terminal-indent-2"><span class="terminal-key">DESCRIPTION:</span></span>
<span class="terminal-line terminal-indent-2">Install a package</span>
<span class="terminal-line terminal-indent-2"><span class="terminal-key">OPTIONS:</span></span>
<span class="terminal-line terminal-indent-2">- <span class="terminal-info">yes:</span> -y, --yes</span>
<span class="terminal-line terminal-indent-3">Answer yes to prompts</span>
<span class="terminal-line terminal-indent-2"><span class="terminal-key">ARGUMENTS:</span> &lt;packageName&gt;</span>
<span class="terminal-line terminal-indent-2">- <span class="terminal-info">packageName:</span> string</span>
</TerminalBlock>

Il est donc important de renseigner les descriptions des commandes et des options: elles deviennent la documentation embarquée de votre outil.

## Version légère avec execOptions

Quand vous écrivez un script qui n'a pas de sous-commandes ni d'argument positionnel, `execOptions` suffit. Il parse seulement les options du process et retourne un objet typé.

```ts twoslash
// @version: 0
<!--@include: @/examples/v0/guide/command/execOptions.ts-->
```

<TerminalBlock title="server-script">
<span class="terminal-line terminal-info">$ server-script --port 3000 --reload</span>
server listens on 3000 with reload
</TerminalBlock>

Utilisez `execOptions` pour les scripts minimaux. Passez à `exec` dès que vous avez des arguments positionnels, des sous-commandes ou une vraie expérience CLI à exposer.
