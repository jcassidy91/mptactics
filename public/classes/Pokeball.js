class Pokeball extends GameObject {
	constructor(spos, epos, pokemon, board) {
		super(spos.x,spos.y,32,32, img.pokeball);
		this.startPos = spos;
		this.endPos = epos;
		this.pokemon = pokemon;
		this.board = board;
	}

	Update() {
		this.moveTowardsPoint(
							this.endPos.x,
							this.endPos.y, 
							4,
							this.createPokemon.bind(this))
	}

	createPokemon() {
		let pokemon = new Unit(this.endPos.x,this.endPos.y,32,32,img.nidoran,{speed:4},this.board);
		this.board.tiles.push(pokemon);
		this.destroy = true;
		//this.board.cursor.deselectObj();
	}
}