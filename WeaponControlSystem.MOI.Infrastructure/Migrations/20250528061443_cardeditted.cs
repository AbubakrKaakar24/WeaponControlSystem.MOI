using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WeaponControlSystem.MOI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class cardeditted : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OfficerID",
                table: "Weapons",
                newName: "OfficerId");

            migrationBuilder.AlterColumn<int>(
                name: "OfficerId",
                table: "Weapons",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Weapons_OfficerId",
                table: "Weapons",
                column: "OfficerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Weapons_Officers_OfficerId",
                table: "Weapons",
                column: "OfficerId",
                principalTable: "Officers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Weapons_Officers_OfficerId",
                table: "Weapons");

            migrationBuilder.DropIndex(
                name: "IX_Weapons_OfficerId",
                table: "Weapons");

            migrationBuilder.RenameColumn(
                name: "OfficerId",
                table: "Weapons",
                newName: "OfficerID");

            migrationBuilder.AlterColumn<int>(
                name: "OfficerID",
                table: "Weapons",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }
    }
}
